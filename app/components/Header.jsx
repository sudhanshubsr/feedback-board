import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import BoardPillPopup from './BoardPillPopup';

const Header = () => {
  const { data: session } = useSession();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const user = session?.user;
  console.log(user)
  const firstName = user?.name.split(' ')[0];


  function login() {
    setShowLoginPopup(!showLoginPopup);
  }

  function toggleDropDown() {
    console.log('toggleDropDown');
    setDropDownOpen(!dropDownOpen);
  }
  return (
    <>
      <div className='max-w-2xl mx-auto text-right mt-4 mb-2 sm:mb-2 sm:mt-2 flex items-center justify-end py-2 px-2'>
          <div className='relative'>
            {session && (
              <div className='flex items-center gap-2 bg-[--platinum] rounded-3xl pl-2 w-40 border-2 mb-2 ml-10'>
              <div className='text-[-primary]'>
                {firstName}
              </div>
              <div>
                <img type="button" onClick={toggleDropDown} className="w-[48px] h-[48px] rounded-full cursor-pointer" 
                src={user.image} alt="User dropdown" />
              </div>
            </div>
            )}
            {!session && (
              <div>
              <img type="button" onClick={showLoginPopup} className="w-[48px] h-[48px] rounded-full cursor-pointer" src="https://github.com/shadcn.png" alt="User dropdown" />
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
