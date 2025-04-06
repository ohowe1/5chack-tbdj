import DefaultLayout from "../components/DefaultLayout";
import {
  Group,
  Paper,
  PaperProps,
  Text,
  Container,
} from '@mantine/core';
import { GoogleButton } from '../components/GoogleButton';

export function Login(props: PaperProps) {
  return (
    <DefaultLayout>
      <Container flex={1} size={720} my={50} className='flex flex-col items-center gap-2'>
      
      <Paper radius="md" p="xl" withBorder {...props} className='flex flex-col items-center gap-2 justify-center w-full mx-auto'>
        <h1 className='font-bold text-2xl' >
          Login with College:
        </h1>
        <Group grow mb="lg" mt="lg" >
          <GoogleButton size="md" radius="xl">Google</GoogleButton>
        </Group>
      </Paper>
    </Container>
    </DefaultLayout>
  );
}

export default Login;
