/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import BoardPillPopup from './BoardPillPopup';
import { useContext } from 'react';
import { BoardInfoContext } from '../utils/getPathname';
import NotificationButton from './NotificationModalComponent';
const Header = () => {
  const { data: session } = useSession();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const {archived} = useContext(BoardInfoContext);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  const firstName = user?.name.split(' ')[0];

  function toggleDropDown() {
    setDropDownOpen(!dropDownOpen);
  }
  return (
    <>
      <div className='max-w-2xl mx-auto text-right mt-4 sm:mb-2 sm:mt-2 flex items-center justify-end py-2 px-2'>
      {archived && (
      <>
        <div className=" bg-orange-300 rounded mb-5 py-1 px-2 w-max font-bold">
          <p className='text-left'>This Board is Archived!</p>
          <p className="text-black text-sm tex-gray-300 font-medium text-left">No further commenting or voting allowed</p>
        </div>
      </>
        )}
          <div className='relative'>
            
            {session && (
              <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 bg-[--platinum] rounded-3xl pl-2 w-40 border-2 mb-2 ml-10'>
              <div className='text-[-primary]'>
                {firstName}
              </div>
              <div>
                <img type="button" onClick={toggleDropDown} className="w-[48px] h-[48px] rounded-full cursor-pointer" 
                src={user?.image} alt="User dropdown" />
              </div>
            </div>
            <NotificationButton />
            </div>
            )}
            {!session && (
              <div>
              <img type="button" className="w-[48px] h-[48px] rounded-full cursor-pointer" src="https://github.com/shadcn.png" alt="User dropdown" />
            </div>
            )}
            {dropDownOpen && (
              <div className='absolute right-[-10px]  bg-[--primary] rounded-2xl'>
              <BoardPillPopup user={user} />
            </div>
            )}
          </div>
        </div>
        
      </>
        
  )
};

export default Header;
