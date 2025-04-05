import React from "react"
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from "@heroui/react"
import {
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react"

export default function NavBar() {

  const [loggedIn , setLoggedIn] = useState<boolean>(false);
  // Implement checking if user is logged in 

  return (
    <Navbar className="w-full bg-white px-2 pt-6 pb-4 flex items-center justify-between">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/">
            Home
          </Link>
        </NavbarBrand>
      </NavbarContent>
      
      <NavbarContent 
        className=" sm:flex gap-4" 
      >
          <Button 
              variant="flat" 
              as={Link}
              href={loggedIn ? "/profile" : "/login"}
              size="sm"
              isIconOnly
              startContent={
                <UserIcon className="size-5" />
              }
              color='primary'
            > 
             
          </Button>
      </NavbarContent>
    </Navbar>
  )
}