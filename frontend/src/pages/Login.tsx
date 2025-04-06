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
      <Container flex={1} size={720} my={50}>
      <Paper radius="md" p="xl" withBorder {...props} className='flex flex-col items-center'>
        <Text size="xl" className='font-bold' fw={500}>
          Welcome to <span className="font-bold">Bountee</span>
        </Text>

        <Group grow mb="lg" mt="lg" >
          <GoogleButton size="md" radius="xl">Google</GoogleButton>
        </Group>
      </Paper>
    </Container>
    </DefaultLayout>
  );
}

export default Login;
