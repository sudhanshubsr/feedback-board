import React from 'react'
import {signOut} from 'next-auth/react';
const SignoutPopOver = ({setIsOpen, user}) => {
    const handleCancelButtonClick = ()=>{
        setIsOpen(false);
    }
    const handleSignoutButtonClick = async()=>{
        await signOut({callbackUrl: "/login"});
    }
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
  <div className="flex items-center gap-4 p-6 bg-[#292524] dark:bg-gray-70">
 
    <div className="grid gap-0.5 text-sm">
      <div className="font-semibold text-white dark:text-gray-200"><a href='/account'>{user?.name}</a></div>
      <div className="text-white dark:text-gray-400">{user?.email}</div>
    </div>
  </div>
  <div className="grid gap-4 p-6">
    <div className="space-y-2">
      <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-none">Sign Out</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">Are you sure you want to sign out?</p>
    </div>
    <div className="grid gap-2">
      <button 
      onClick={handleSignoutButtonClick}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full text-white bg-[#292524] hover:bg-[#292524]">
        Sign Out
      </button>
      <button onClick={handleCancelButtonClick} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-10 px-4 py-2 w-full text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
        Cancel
      </button>
    </div>
  </div>
</div>
  )
}

export default SignoutPopOver