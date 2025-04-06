import DefaultLayout from "../components/DefaultLayout";
import {
  TextInput,
  NumberInput,
  Textarea, 
} from "@mantine/core";
import { Button, Link } from "@heroui/react";
import { fetchAPI } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";


function BackBounty() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const createdBounty = await fetchAPI(`back/${id}`, "POST", {
      amount: parseInt(data.get("amount") as string),
      })
    
      navigate("/")
    }

  return (
    <DefaultLayout>
      <div className="">
        <div className='mb-4'>
          <h1 className="text-2xl font-bold">Back this bounty?</h1>
          <p>Consider backing a bounty to incentivize more people to help complete this task!</p>
        </div>
        
        <form 
          className='flex flex-col gap-2'
          onSubmit={handleSubmit}
        >
          <div>
            <NumberInput 
              placeholder="Bounty amount"
              label="Bounty Amount"
              name="amount"
              required 
              min={0}
              leftSection={"$"}
              />
          </div>
          
            <div className='flex flex-col gap-2 items-center'>
              <Button
            type="submit"
            className="w-1/2 mx-auto mt-4"
            
            >
              Back Bounty
            </Button>
            <Link className='text-sm text-gray-500' href="/">
              Skip
            </Link>
            </div>
          
        </form>

      </div>
    </DefaultLayout>
  );
}

export default BackBounty;