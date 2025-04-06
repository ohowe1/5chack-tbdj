import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  Link} from "@heroui/react"
import {
  UserIcon,
} from "@heroicons/react/24/outline";
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

        <Link 
          href={user ? "/profile" : "/login"}
        >
            <UserIcon className="size-5" />
        </Link>
          
      </NavbarContent>
    </Navbar>
  )
}