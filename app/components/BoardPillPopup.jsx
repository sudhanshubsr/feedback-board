import React from 'react'
import {signOut} from 'next-auth/react';
import Link from 'next/link';
const BoardPillPopup = ({setIsOpen, user}) => {

    const handleSignoutButtonClick = async()=>{
        await signOut({callbackUrl: "/login"});
    }
  return (
    <>
    <div class="px-4 py-4 text-sm text-white">
      <div>{user?.name}</div>
      {/* <div>{user?.email}</div> */}
    </div>
    <ul class="py-2 text-sm text-white" aria-labelledby="avatarButton">
      <li>
        <Link href="/account" class="block px-4 py-2 hover:bg-gray-100  hover:text-black">Dashboard</Link>
      </li>

      {/* <li>
        <Link href='/account' class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-black">Notification</Link>
      </li> */}
      <li>
        <Link href='/account' class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-black">Account</Link>
      </li>
      
    </ul>
    <div class="py-1">
      <a onClick={handleSignoutButtonClick} class="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black cursor-pointer ">Sign out</a>
    </div>
    </>
  )
}

export default BoardPillPopup