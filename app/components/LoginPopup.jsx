import React from 'react'
import { signIn } from "next-auth/react";
import Popup from './Popup'

const handleGoogleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await signIn("google"); // Perform Google login using the next-auth library
  };

  // Function to handle Github login
  const handleGithubLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    signIn("github"); // Perform Github login using the next-auth library
  };
const LoginPopup = ({setShowLoginPopup}) => {
  return (
    <div>
        <Popup narrow setShow={setShowLoginPopup} title={"Login to Confirm Your Vote"}>
          <div className="flex gap-4 justify-center p-2">
            <button onClick={handleGoogleLogin} className="bg-blue-600 text-white rounded-md py-1 px-3">Login with Google</button>
            <button onClick={handleGithubLogin} className="bg-blue-600 text-white rounded-md py-1 px-3">Login with Github</button>
          </div>
        </Popup>
    </div>
  )
}

export default LoginPopup