import DefaultLayout from "../components/DefaultLayout";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Container,
} from '@mantine/core';
import { upperFirst, useToggle } from '@mantine/hooks';
import { GoogleButton } from '../components/GoogleButton';

export function Login(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);

  return (
    <DefaultLayout>
      <Container flex={1} size={720} my={50}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="xl" fw={500}>
          Welcome to bountee, {type} with
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
