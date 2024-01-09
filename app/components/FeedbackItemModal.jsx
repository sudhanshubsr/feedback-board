import React from 'react';
import Popup from './Popup';
import Button from './Button';
import FeedbackItemPopupComments from './FeedbackItemPopupComments';
import axios from 'axios';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import Attachment from './Attachment';

const FeedbackItemPopup = ({ title, description, openShow, votes, id, onVoteChange, uploads }) => {
  const [isVotesLoading, setIsVotesLoading] = useState(false);
  const { data: session } = useSession();

  const handleVoteClick = async () => {
    try {
      if (session?.user) {
        setIsVotesLoading(true);
        await axios.post('/api/vote', { feedbackId: id });
        await onVoteChange();
        setIsVotesLoading(false);
      } else {
        alert("Please login to vote");
      }
    } catch (err) {
      console.log(err);
    }
  };


  const iVoted = votes?.some((vote) => vote.userEmail === session?.user?.email);

  return (
    <Popup title={''} setShow={openShow}>
      <div className='p-8 pb-2'>
        <h2 className='text-lg font-bold mb-2'>{title}</h2>
        <p className='text-gray-600'>{description}</p>

        {uploads?.length > 0 && (
          <div className='mt-4'>
            <span className='text-gray-600'>Attachments:</span>
            <div className='mt-1 flex gap-2'>
              {uploads.map((link,index) => (
                <Attachment key={index} link={link} showRemoveButton={false} />
              ))}
            </div>
          </div>
        )}

        <div className='flex justify-end px-8 py-2 border-b'>
        
        {isVotesLoading && (
            <MoonLoader size={20} color={"#000"} loading={isVotesLoading} />
        )}

          {!isVotesLoading && (
            <Button primary={iVoted ? 'true':""} onClick={handleVoteClick} disabled={!session?.user}>
              {!iVoted && (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" dataslot="icon" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                </span>
              )}
              {iVoted && (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" dataslot="icon" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 13.5 12 21m0 0 7.5-7.5M12 21V3" />
                  </svg>
                </span>
              )}
              {!iVoted && (
                <>
                  {session ? 'Upvote' : 'Login to vote'} {session ? (votes?.length || 0) : ''}
                </>
              )}
              {iVoted && (
                <>
                  {session ? 'Downvote' : 'Login to vote'} {session ? (votes?.length || 0) : ''}
                </>
              )}
            </Button>
          )}
          
        </div>
        
        <div>
          <FeedbackItemPopupComments feedbackId={id} />
        </div>
      </div>
    </Popup>
  );
};

export default FeedbackItemPopup;
