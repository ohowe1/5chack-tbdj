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
import { useState, useEffect } from "react"
import { useAuth } from '../context/AuthContext';


export default function NavBar() {
  const { user, loading } = useAuth();

  return (
    <Navbar className="w-full bg-white px-2 py-2" height="3rem">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/">
            Home
          </Link>
        </NavbarBrand>
      </NavbarContent>
      
      <NavbarContent 
        className=" sm:flex gap-4" 
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