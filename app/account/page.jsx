'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import BoardCard from '../components/BoardCard';
import HomebuttonIcon from '../components/icons/HomebuttonIcon';
import BoardbuttonIcon from '../components/icons/BoardbuttonIcon';
import ProfileCard from '../components/ProfileCard';

const AccountPage = () => {
    const {data:session, status} = useSession();
    const [accountinfoModel, setAccountinfoModel] = useState(false);
 

    const router = useRouter();
    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/login');
        }
    },[status]);

    if(status === 'loading'){
        return <div>Loading...</div>
    }
    if(status === 'unauthenticated'){
        return <div>Unauthenticated</div>
    }

    const handleHomeButtonClick = () => {
        setAccountinfoModel(true);
    }
    const handleBoardButtonClick = () => {
        setAccountinfoModel(false);
    }
   
  return (
    
    <>
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-white">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2 px-2">
          <div className="flex h-[60px] items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              
              <span className="">Dashboard</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
            <button
                className="flex items-center gap-3 rounded-lg bg-[--primary] px-3 py-2 text-white mb-2"
                onClick={handleHomeButtonClick}
              >
                <HomebuttonIcon />
                Home
              </button>
              <button
                className="flex items-center gap-3 rounded-lg bg-[--primary] px-3 py-2 text-white "
                onClick={handleBoardButtonClick}
              >
                <BoardbuttonIcon />
                Boards
              </button>
            </nav>
           
          </div>
   

        </div>
          </div>
          <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">

          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">{accountinfoModel ? 'Account Info' : 'Boards'}</h1>
          </div>
          {!accountinfoModel && (
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3
            bg-[#0C0A09] hover:bg-[#0C0A01] text-white
            ">
            Add Board
          </button>
          )}
        </header>
        {accountinfoModel && (<ProfileCard />)}
        {!accountinfoModel && (
            <BoardCard />
        )}
          </div>
        </div>
    </>
  )
}

export default AccountPage