"use client"

import { signOut } from 'next-auth/react'

import type { Session, User } from 'next-auth'
import {Avatar,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL';

const UserButton = ({session,setIsChecked}: {session: Session | null,setIsChecked: Dispatch<SetStateAction<boolean>>}) => {
  const router  = useRouter();
  const handleAction = (action : string)=>{
    if(action === 'signout'){
      signOut();
    }
    else if(action === 'profile'){
      setIsChecked(false)
      router.push(`/user/${session?.user.id}`)
    }
  }
  return (
    <>
      {
        session ? 
        (
          <Dropdown className='bg-base-100 text-base-content'>
          <DropdownTrigger>
          {
            session.user.image?.includes("cloudinary") ? (
              <div className="avatar p-0 rounded-full">
              <div className="w-10 rounded-full">
                <img src={transformCloudinaryURL(session.user.image) || ''} alt={`${session.user.name}_image`}/>
              </div>
            </div>
            ):(
              <Avatar name={session.user.name!} />
            )
          }
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="User Profile Menu" 
            className='rounded-lg'
            onAction={(key) => handleAction(key as string)}
          >
            <DropdownItem key="profile">User Profile</DropdownItem>
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