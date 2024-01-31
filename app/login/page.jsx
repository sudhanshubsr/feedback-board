'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
const AccountPage = () => {
  const handleGoogleSignin = async(e)=>{
    e.preventDefault();
    await signIn("google", {callbackUrl: "http://localhost:3000/"});
  }
  return (
    <>

        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form className="flex flex-col w-full h-full pb-6 text-center bg-transparent rounded-3xl">
                <h3 className="mb-3 text-4xl mt-28 md:mt-5 font-extrabold text-[--primary]">Sign In</h3>
                <p className="mb-4 text-grey-700">Enter your email to get Started</p>
                <button onClick={handleGoogleSignin} className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400  cursor-pointer">
                  <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="Google"/>
                  Sign in with Google
                </button>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                <input id="email" type="email" placeholder="
                Enter your Email" className="flex items-center md:w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
          
                <button className="w-96 px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl bg-[--primary] ">Login With Email</button>
              </form>
            </div>
          </div>
        </div>
   
    </>
  );
};

export default AccountPage;
