import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import FeedbackItemPopupCommentsForm from './FeedbackItemPopupCommentsForm';
import axios from 'axios';
import Attachment from './Attachment';
import TimeAgo from 'timeago-react';

const FeedbackItemPopupComments = ({ feedbackId }) => {
  const [comments, setComments] = useState([]);

  // Function to fetch comments for the given feedbackId
  const fetchComments = async () => {
    try {
      const res = await axios.get('/api/comment?feedbackId=' + feedbackId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch comments when the component mounts or when feedbackId changes
  useEffect(() => {
    fetchComments();
  }, [feedbackId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='p-8'>
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className='mb-8'>
            <div className='flex gap-4'>
              <Avatar url={comment.user ? comment.user.image : 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png'} />
              <div>
                <p className='text-gray-600'>{comment.text}</p>
                <div className='text-gray-400 mt-1 text-[12px]'>
                  {comment.user ? comment.user?.name : comment.userEmail} &middot; {<TimeAgo datetime={comment.createdAt} />}
                  <div className='mt-1 flex gap-2'>
                    {comment.uploads?.length > 0 &&
                      comment.uploads.map((link,index) => (
                        <Attachment key={index} link={link} showRemoveButton={false} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <FeedbackItemPopupCommentsForm feedbackId={feedbackId} onCommentCreate={fetchComments} />
    </div>
  );
};

export default FeedbackItemPopupComments;
