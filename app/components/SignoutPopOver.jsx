import React from 'react'
import {signOut} from 'next-auth/react';
const SignoutPopOver = ({setIsOpen, user}) => {
    const handleCancelButtonClick = ()=>{
        setIsOpen(false);
    }
    const handleSignoutButtonClick = async()=>{
        await signOut({callbackUrl: "http://localhost:3000/login"});
    }
  return (
    <div class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
  <div class="flex items-center gap-4 p-6 bg-[--secondary] dark:bg-gray-700">
    <span class="relative flex shrink-0 overflow-hidden h-12 w-12 border-2 border-gray-300 rounded-full shadow-lg">
      <span class="flex h-full w-full items-center justify-center rounded-full bg-muted"><img src={user?.image} alt="AA" /></span>
    </span>
    <div class="grid gap-0.5 text-sm">
      <div class="font-semibold text-gray-800 dark:text-gray-200">{user?.name}</div>
      <div class="text-gray-500 dark:text-gray-400">{user?.email}</div>
    </div>
  </div>
  <div class="grid gap-4 p-6">
    <div class="space-y-2">
      <h4 class="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-none">Sign Out</h4>
      <p class="text-sm text-gray-500 dark:text-gray-400">Are you sure you want to sign out?</p>
    </div>
    <div class="grid gap-2">
      <button 
      onClick={handleSignoutButtonClick}
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full text-white bg-[--primary] hover:bg-[--primary-light]">
        Sign Out
      </button>
      <button onClick={handleCancelButtonClick} class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-10 px-4 py-2 w-full text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
        Cancel
      </button>
    </div>
  </div>
</div>
  )
}

export default SignoutPopOver