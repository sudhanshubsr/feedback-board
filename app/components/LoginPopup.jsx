// 'use client' is not a recognized syntax, assuming it's a comment

import React from 'react';
import { signIn } from 'next-auth/react';
import Popup from './Popup';
import { Github } from 'lucide-react';
import { IoLogoGoogle } from 'react-icons/io5';

const LoginPopup = ({ setShowLoginPopup }) => {
  const [email, setEmail] = React.useState('');

  // Function to handle email login
  async function handleEmailLogin(e) {
    e.preventDefault();
    const signInResult = await signIn('email', {
      email,
      redirect: false,
    });

    // Reset email input if login is not successful
    if (!signInResult?.ok) {
      setEmail('');
    } else {
      setShowLoginPopup(false); 
    }
  }

  // Function to handle Github login
  const handleGithubLogin = async (e) => {
    e.preventDefault();
    await signIn('github');
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    await signIn('google');
  };

  return (
    <div>
      <Popup setShow={setShowLoginPopup} title={'Login to Confirm Your Vote'}>
        <form onSubmit={handleEmailLogin} className="max-w-sm mx-auto">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
            Your email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email" // Changed to "email" for better accessibility
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            name="email"
          />
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
          >
            Login with Email
          </button>
        </form>
        <div>
          <p className="text-center mt-2">or</p>
        </div>
        <div className="flex gap-4 justify-center p-2 mt-1">
          {/* Uncomment if you want to use Google login */}
          <button onClick={handleGoogleLogin} className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login with Google <IoLogoGoogle className="w-5 h-5" />
          </button>

          <button
            onClick={handleGithubLogin}
            className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login with Github <Github className="w-5 h-5" />
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default LoginPopup;
