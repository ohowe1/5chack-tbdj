import DefaultLayout from "../components/DefaultLayout";
import { CreateOrderResponse } from "shared/types/api";
import { NumberInput } from "@mantine/core";
import { Link } from "@heroui/react";
import { fetchAPI } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import {
  OnApproveData,
} from "@paypal/paypal-js";
import { useCallback, useState } from "react";

function BackBounty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number | string>(0);

  const initialOptions: ReactPayPalScriptOptions = {
    "disable-funding": "credit,card,paylater",
    clientId:
      "ASXoaC8CdgoBJZ41Kwivw-DHxsWWht1E7Ro_4nMMOzdlePJbkEronZ1lwoP6kltKDupYqsrpOXn2rPbT",
    "enable-funding": "venmo",
    "buyer-country": "US"
  };
  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    await fetchAPI(`back/${id}`, "POST", {
      amount: parseInt(data.get("amount") as string),
    });
    navigate("/");
  };

  const createOrder = useCallback(
    async () => {
      const createOrderResponse = (await fetchAPI(
        "payment/create-order",
        "POST",
        {
          postId: id,
          amount: parseInt(amount as string),
        }
      )) as CreateOrderResponse;

      if (createOrderResponse && createOrderResponse.orderID) {
        return createOrderResponse.orderID;
      }
      console.error("Failed to create PayPal order:", createOrderResponse);
      throw new Error("Failed to create PayPal order");
    },
    [amount, id]
  );

  const onApprove = useCallback(
    async (data: OnApproveData) => {
      const orderID = data.orderID;
      if (!orderID) {
        console.error("Order ID not found");
        return;
      }

      try {
        const captureResponse = await fetchAPI(
          "payment/capture-order",
          "POST",
          {
            orderID: orderID,
            postId: id,
          }
        );

        if (captureResponse) {
          console.log("Order captured successfully:", captureResponse);
          // Optionally, you can redirect or show a success message here
          navigate("/");
        } else {
          console.error("Failed to capture PayPal order:", captureResponse);
        }
      } catch (error) {
        console.error("Error capturing PayPal order:", error);
      }
    },
    [id, navigate]
  );

  return (
    <DefaultLayout>
      <div className="">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Back this bounty?</h1>
          <p>
            Consider backing a bounty to incentivize more people to help
            complete this task!
          </p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
      </div>
    </DefaultLayout>
  );
}

export default BackBounty;
