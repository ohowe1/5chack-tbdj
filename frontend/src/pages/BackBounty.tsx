import type React from "react"
import DefaultLayout from "../components/DefaultLayout"
import type { CreateOrderResponse } from "shared/types/api"
import { NumberInput, Tabs, Textarea } from "@mantine/core"
import { Link } from "@heroui/react"
import { fetchAPI } from "../utils/api"
import { useParams, useNavigate } from "react-router-dom"
import { PayPalScriptProvider, PayPalButtons, type ReactPayPalScriptOptions } from "@paypal/react-paypal-js"
import type { OnApproveData } from "@paypal/paypal-js"
import { useCallback, useState } from "react"

function BackBounty() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [amount, setAmount] = useState<number | string>(0)
  const [commission, setCommission] = useState("")
  const [activeTab, setActiveTab] = useState<string | null>("money")

  const initialOptions: ReactPayPalScriptOptions = {
    "disable-funding": "credit,card,paylater",
    clientId: "ASXoaC8CdgoBJZ41Kwivw-DHxsWWht1E7Ro_4nMMOzdlePJbkEronZ1lwoP6kltKDupYqsrpOXn2rPbT",
    "enable-funding": "venmo",
    "buyer-country": "US",
  }

  // Function to handle money form submission
  const handleMoneySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    await fetchAPI(`back/${id}`, "POST", {
      amount: Number.parseInt(data.get("amount") as string),
    })
    navigate("/")
  }

  // Function to handle commission form submission
  const handleCommissionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    await fetchAPI(`back/${id}/commission`, "POST", {
      commission: data.get("commission") as string,
    })
    navigate("/")
  }

  const createOrder = useCallback(async () => {
    const createOrderResponse = (await fetchAPI("payment/create-order", "POST", {
      postId: id,
      amount: Number.parseInt(amount as string),
    })) as CreateOrderResponse

    if (createOrderResponse && createOrderResponse.orderID) {
      return createOrderResponse.orderID
    }
    console.error("Failed to create PayPal order:", createOrderResponse)
    throw new Error("Failed to create PayPal order")
  }, [amount, id])

  const onApprove = useCallback(
    async (data: OnApproveData) => {
      const orderID = data.orderID
      if (!orderID) {
        console.error("Order ID not found")
        return
      }

      try {
        const captureResponse = await fetchAPI("payment/capture-order", "POST", {
          orderID: orderID,
          postId: id,
        })

        if (captureResponse) {
          console.log("Order captured successfully:", captureResponse)
          // Optionally, you can redirect or show a success message here
          navigate("/")
        } else {
          console.error("Failed to capture PayPal order:", captureResponse)
        }
      } catch (error) {
        console.error("Error capturing PayPal order:", error)
      }
    },
    [id, navigate],
  )

  return (
    <DefaultLayout>
      <div className="">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Back this bounty?</h1>
          <p>Consider backing a bounty to incentivize more people to help complete this task!</p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab} className="mb-4">
          <Tabs.List>
            <Tabs.Tab value="money">Back with Money</Tabs.Tab>
            <Tabs.Tab value="commission">Back with Commission</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="money">
            <form className="flex flex-col gap-2 mt-4" onSubmit={handleMoneySubmit}>
              <div>
                <NumberInput
                  placeholder="Bounty amount"
                  label="Bounty Amount"
                  name="amount"
                  value={amount}
                  onChange={(value) => setAmount(value ?? 0)}
                  required
                  min={0}
                  leftSection={"$"}
                />
              </div>

              <div className="flex flex-col my-3 items-center">
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                </PayPalScriptProvider>
                <Link className="text-sm text-gray-500" href="/">
                  Skip
                </Link>
              </div>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="commission">
            <form className="flex flex-col gap-2 mt-4" onSubmit={handleCommissionSubmit}>
              <div>
                <Textarea
                  placeholder="Describe the task you're willing to do as payment"
                  label="Commission Offer"
                  name="commission"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  required
                  minRows={4}
                  description="Offer a service or task you're willing to perform as payment for this bounty"
                />
              </div>

              <div className="flex flex-col my-3 items-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full mb-3"
                >
                  Submit Commission Offer
                </button>
                <Link className="text-sm text-gray-500" href="/">
                  Skip
                </Link>
              </div>
            </form>
          </Tabs.Panel>
        </Tabs>
      </div>
    </DefaultLayout>
  )
}

export default BackBounty
