import React, { useState } from 'react';
import Button from './Button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import LoginPopup from './LoginPopup';


const FeedbackItem = ({ title, description, openShow, votes, id, onVoteChange,status}) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isVotesLoading, setIsVotesLoading] = useState(false);
  const { data: session } = useSession();
  const isLoggedin = !!session?.user?.email;

  const handleVoteClick = async (e) => {
    e.preventDefault();
    if (!isLoggedin) {
      localStorage.setItem("feedback-id to vote", id);
      setShowLoginPopup(true);
    } else {
      try {
        localStorage.removeItem("feedback-id to vote");
        setIsVotesLoading(true);
        await axios.post('/api/vote', { feedbackId: id });
        await onVoteChange();
        setIsVotesLoading(false);
      } catch (err) {
        console.log(err);
        setIsVotesLoading(false);
      }
    }
  };
  const truncateDescription = (description)=>{
    if(description.length > 230){
      return description.substring(0,240)+"...Read More"
    }
    return description
  }

  const isVoted = !!votes?.some(vote => vote.userEmail === session?.user?.email);
  const statusLabel = status[0].toUpperCase() + status.substring(1).replace('_', ' ');
  let statusColor = 'bg-gray-400';
  if (status === 'planned') statusColor = 'bg-emerald-200';
  if (status === 'in_progress') statusColor = 'bg-amber-400';
  if (status === 'complete') statusColor = 'bg-green-400';
  if (status === 'archived') statusColor = 'bg-purple-400';
  return (
    <div className="flex gap-8 items-center my-8">
      <a href="" onClick={(e) => { e.preventDefault(); openShow(); }} className="flex-grow">
        <div className="flex-col center gap-2">
        <h2 className="font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{truncateDescription(description)}</p>
        </div>
        <div>
          {status !== 'new' && (
            <div className="inline-flex gap-1 items-center text-sm">
              <div className={statusColor + " w-2 h-2 rounded-full"}></div>
              {statusLabel}
            </div>
          )}
        </div>
      </a>
      
      <div>
        {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}

        <Button primary={isVoted ? "true" : undefined} onClick={handleVoteClick} className="shadow-md border">
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
          {isVotesLoading && <MoonLoader color="#000000" loading={true} size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackItem;
