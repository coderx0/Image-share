"use client"

import { LogOut,UserCircle } from 'lucide-react'

import { signOut } from 'next-auth/react'

import type { Session, User } from 'next-auth'
import {Avatar,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import Link from 'next/link';

const UserButton = ({session}: {session: Session | null}) => {
  const handleAction = (action : string)=>{
    if(action === 'signout'){
      signOut();
    }
  }
  return (
    <>
      {
        session ? 
        (
          <Dropdown>
          <DropdownTrigger>
          <Avatar name={session.user.name!} />
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="User Profile Menu" 
            className='rounded-lg'
            onAction={(key) => handleAction(key as string)}
          >
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="signout" className="text-danger" color="danger">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        )
        :
        (
          <Link href='/sign-in' className="btn btn-sm btn-accent rounded-lg">
                Login
          </Link>
        )
      }
    </>
  )
}

export default UserButton