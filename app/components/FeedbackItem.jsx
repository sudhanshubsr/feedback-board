import React, { useState} from 'react';
import Popup from './Popup';
import {signIn} from "next-auth/react"
import Button from './Button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import LoginPopup from './LoginPopup';

const FeedbackItem = ({ title, description, openShow, votes, id, onVoteChange, parentLoadingVotes=true}) => {
  
  
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State variable to control the visibility of the login popup
  const [isVotesLoading, setIsVotesLoading] = useState(false); // State variable to check if the votes are loaded from the database
  const {data:session} = useSession()
  const isLoggedin = !!session?.user?.email // Check if the user is logged in
  // Callback function to handle the vote click event
  const handleVoteClick =async (e) => {
    e.preventDefault();
    if (!isLoggedin) {
      localStorage.setItem("feedback-id to vote", id)
      setShowLoginPopup(true); // Show the login popup if the user is not logged in
    }
    else{
      try{
        setIsVotesLoading(true)
        await axios.post('/api/vote',{feedbackId: id})
        await onVoteChange()
        setIsVotesLoading(false)
      }
      catch(err){
        console.log(err)
      }
    }
  };

  const isVoted = !!votes?.some(vote => vote.userEmail === session?.user?.email)
  

  return (
    <div className="flex gap-8 items-center my-8 b">
      <a href="" onClick={(e) => { e.preventDefault(); openShow(); }} className="flex-grow">
        <h2 className="font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </a>
      <div>
        {showLoginPopup && (
          <LoginPopup setShowLoginPopup={setShowLoginPopup} />
        )}
          <Button {...(isVoted ? { primary: true } : {})} onClick={handleVoteClick} className="shadow-md border ">
          {!isVotesLoading && (
            <>
            {!isVoted && (
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.5}
              stroke="currentColor"
              dataslot="icon"
              className="w-4 h-4" 
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
            )}
            {isVoted && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            )}
              {votes?.length || 0}
            </> 
              
          )}
          {isVotesLoading && (
            <MoonLoader color="#000000" loading={true} size={18} />
          )}
          </Button>
      
        
        
      </div>
    </div>
  );
};

export default FeedbackItem;