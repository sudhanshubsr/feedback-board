import React from 'react';
import Popup from './Popup';
import Button from './Button';
import FeedbackItemPopupComments from './FeedbackItemPopupComments';
import axios from 'axios';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import Attachment from './Attachment';
import Upvote from './icons/Upvote';
import Downvote from './icons/Downvote';
import { FaRegEdit } from "react-icons/fa";
import AttachFileComponent from './AttachFileComponent';
import { LuTrash2 } from "react-icons/lu";

const FeedbackItemPopup = ({ title, description, openShow, votes, id, onVoteChange, uploads, userEmail, onFeedbackUpdate}) => {
  
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newUploads, setNewUploads] = useState(uploads);
  
  const [isVotesLoading, setIsVotesLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: session } = useSession();
  const iVoted = votes?.some((vote) => vote.userEmail === session?.user?.email);


  // Function to handle Vote Functionality
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

  // Function to handle Edit Feedback

  const handleFeedbackEdit = async () => {
    setIsEditMode(true);
  }
  
  const handleRemoveFileClick = (e, link) => {
    e.preventDefault();
    setNewUploads(newUploads.filter((item) => item !== link));
  };

  const handleUpload = (newLinks) => {
    setNewUploads([...newUploads, ...newLinks]);
  }

  const handleCancelBtnClick = () => {
    setIsEditMode(false);
    setNewDescription(description);
    setNewTitle(title);
    setNewUploads(uploads);
  }
  const handleSaveChangesButton = async () => {
    try {
      await axios.put('/api/feedback',{feedbackId:id, title:newTitle, description:newDescription, uploads:newUploads, userEmail})
      .then(()=>{
        onFeedbackUpdate({
          title:newTitle,
          description:newDescription,
          uploads:newUploads
        });
        setIsEditMode(false);
      })
      
    }
    catch(err){
      console.log(err);
  }
}
  return (
    <Popup title={''} setShow={openShow}>
      <div className='p-8 pb-2'>

      {isEditMode &&(
        <>
        <input onChange={(e)=>setNewTitle(e.target.value)} className='border border-gray-300 p-2 mb-4 w-full' type="text" placeholder="Title" value={newTitle} />

        <textarea onChange={(e)=>setNewDescription(e.target.value)} className='border border-gray-300 p-2 mb-4 w-full h-32' type="text" placeholder="Description" value={newDescription} />
        
        
        <div className='mt-2'>
            <span className='text-gray-600'>Attachments:</span>

              <div className='mt-1 flex gap-2'>
                {newUploads.map((link,index) => (
                  <Attachment key={index} link={link} showRemoveButton={true} handleRemoveFileClick={(e,link)=>{handleRemoveFileClick(e,link)}}/>
                ))}
              </div>
        </div>
        


        </>
        
      )}

      {!isEditMode && (
        <>
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
        </>
      )}
        

        <div className='flex justify-end px-8 py-2 border-b'>
        {!isEditMode && (
          <>
          {session?.user?.email === userEmail && (
            <Button onClick={handleFeedbackEdit}>
            <FaRegEdit />
            <span className='ml-1'>Edit</span>
          </Button>
          )} 
          </>
        )}
        {isEditMode && (
          <>
          <AttachFileComponent onUploadFile={handleUpload} />
          <Button onClick={handleCancelBtnClick}><LuTrash2 />Cancel</Button>
          <Button primary='true' onClick={handleSaveChangesButton}>Save Changes</Button>
          </>
        )}

        {!isEditMode && (
          <>
        {isVotesLoading && (
            <MoonLoader size={20} color={"#000"} loading={isVotesLoading} />
        )}

        {!isVotesLoading && (
        <Button
          primary={iVoted ? 'true' : ""}
          onClick={handleVoteClick}
          disabled={!session?.user}
        >
          {!iVoted ? <Upvote /> : <Downvote />}

          {!iVoted ? (
            <>
              {session ? 'Upvote' : 'Login to vote'} {session ? votes?.length || 0 : ''}
            </>
          ) : (
            <>
              {session ? 'Downvote' : 'Login to vote'} {session ? votes?.length || 0 : ''}
            </>
          )}
        </Button>
        )}
          </>                                                                                                      
        )}  
         
        
        

          
        </div>
        {!isEditMode && (<div>
          <FeedbackItemPopupComments feedbackId={id} />
        </div>)}
        
      </div>
    </Popup>
  );
};

export default FeedbackItemPopup;
