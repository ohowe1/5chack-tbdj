import { Box, TextInput } from "@mantine/core"
import {Button} from "@heroui/react"
import ProfileLayout from "../components/ProfileLayout";
import { useAuth } from "../context/AuthContext";
import {useState, useEffect} from "react";
import { fetchAPI } from "../utils/api";
import { TUser } from "shared/types/user";


export default function SettingsPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
      setEmail(user?.payoutEmail ? user?.payoutEmail : "")
    }, [user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newEmail = await fetchAPI("user/update-email", "POST", {
      email: data.get("email")
    }) as TUser
    console.log(newEmail)
    setEmail(newEmail.payoutEmail ? newEmail.payoutEmail : "")
    
  }

    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Settings</h1>
        <p className="mb-6 font text-sm">Configure your account settings here.</p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <TextInput 
            label="Your payout email"
            placeholder="your@email.com"
            type="email"
            name="email"
            value={email}
            onChange={(event) => {setEmail(event.currentTarget.value)}}
          />
          <Button
            size="sm"
            type="submit"
          >Update Email</Button>
        </form>
        </ProfileLayout>
      </Box>
    )
  }