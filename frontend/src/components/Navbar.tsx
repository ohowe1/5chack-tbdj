import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  Link, 
  Button
} from "@heroui/react"
import {IconUser} from "@tabler/icons-react"
import { useAuth } from '../context/AuthContext';


export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar className="px-0 py-2" height="3rem">
      <NavbarContent justify="start">
        <NavbarBrand>
            <Link href="/" className="flex items-center">
            <img src="/bountee.svg" alt="Logo" className="h-8" />
            </Link>
        </NavbarBrand>
      </NavbarContent>
      
      <NavbarContent 
        className="sm:flex gap-4" 
        justify="end"
      >
        <Button 
          className='bg-white border-2 border-default-200'
          isIconOnly
          radius="full"
          size="sm"
        >
        <Link 
          href={user ? "/profile" : "/login"}
        >
            <IconUser className="size-5" />
        </Link>
        </Button>
      </NavbarContent>
    </Navbar>
  )
}