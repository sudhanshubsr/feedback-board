import React from 'react';
import {signOut} from 'next-auth/react';

const AccountInfoCard = ({user}) => {

  const handleSignout = async () => {
    await signOut({callbackUrl: '/login'});
  }
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="rounded-full w-24 h-24 border-4 border-gray-200 dark:border-gray-800 flex items-center justify-center bg-muted overflow-hidden object-cover">
        <span className="text-xl font-bold"><img src={user?.image} /></span>
      </div>
      <h2 className="text-2xl font-bold">{user?.name}</h2>
      <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400">Premium Member</span>
      </div>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
          <line x1="16" x2="16" y1="2" y2="6"></line>
          <line x1="8" x2="8" y1="2" y2="6"></line>
          <line x1="3" x2="21" y1="10" y2="10"></line>
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400">Joined on January 1, 2022</span>
      </div>
      <div className="flex gap-4">
        <button className="rounded-md text-sm font-medium border hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-[--primary] text-white">
          Edit Account
        </button>
        <button className="rounded-md text-sm font-medium border bg-[--primary] text-white hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Change Password
        </button>
        
      </div>
      <button className="flex items-center justify-center rounded-md w-[290px] bg-[--primary] text-white px-3 py-2"
        onClick={handleSignout}>
        Sign Out
        </button>
    </div>
  );
};

export default AccountInfoCard;
