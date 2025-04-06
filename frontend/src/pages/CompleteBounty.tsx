import DefaultLayout from "../components/DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Textarea, Checkbox } from "@mantine/core";
import { Button} from "@heroui/react";
import { fetchAPI } from "../utils/api";
import { TPostFilled, POST_STATUS, TPostCompletionRequestFilled } from "shared/types/post";


function CompleteBounty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("wassup losers")
    const data = new FormData(e.currentTarget);

    const newCompletion = (await fetchAPI(`completions`, "POST", {
        post_id: id,
        comment: data.get("description")
    })) as TPostCompletionRequestFilled

    console.log(newCompletion)

    navigate("/")
  }


  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-2">Complete Bounty</h1>
      <form 
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Textarea
          placeholder="Leave a description of what you did!"
          label="Description"
          name="description"
        />
        <Checkbox 
        label="I confirm that I completed this bounty"
        required
        color="#67c2ce"
        />
        <Button
          className="w-1/2 mx-auto"
          type="submit"
        >
          Complete Bounty
        </Button>
      </form>
      

    </DefaultLayout>
  );
}

export default CompleteBounty;