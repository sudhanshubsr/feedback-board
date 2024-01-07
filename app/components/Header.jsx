'use client'
import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import LoginPopup from './LoginPopup'
import Button from './Button'
import Login from './icons/Login'
import Logout from './icons/Logout'
const Header = () => {
    const {data:session} = useSession()
    const isLoggedIn = !!session?.user?.email;
    const [showLoginPopup, setShowLoginPopup] = useState(false); // State variable to control the visibility of the login popup

    function logout(){
        signOut();
    }
    function login(){
        setShowLoginPopup(true)
    }
  return (
    <div className='max-w-2xl mx-auto text-right mt-3 mb-[-10px] flex items-center justify-end'>
        {isLoggedIn && (
            <>
            Hello, {session.user.name}
            <Button className='ml-4 shadow-md shadow-gray-400  px-3 bg-red-500 text-white' onClick={logout}>Logout <Logout /></Button>
            
            </>    
        )}
        {!isLoggedIn && (
            <>
            <Button className='ml-4 shadow-sm shadow-gray-400 px-3 bg-blue-500 text-white' onClick={login}>Login <Login /></Button>
            
            </>

        )}
        {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup}/>}
        
    </div>
)}

export default Header