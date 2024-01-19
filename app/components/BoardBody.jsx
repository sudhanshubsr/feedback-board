import React from 'react'
import FeedbackItem from "./FeedbackItem";
import { MoonLoader } from "react-spinners";
export const BoardBody = ({feedbacks, votes, getVotes, openFeedbackItem, fetchingFeedbacks}) => {
  return (
    <>
    {fetchingFeedbacks && (
        <div className="relative left-1/2 transform -translate-x-10">
        <MoonLoader color='#1D4ED8' size={40} className="m-5" />
        </div>
        
      )}
    {!fetchingFeedbacks && (
    <div className="px-8">
          {/* Render feedback items */}
          {feedbacks.length === 0 && !fetchingFeedbacks ? (
            <div className="text-center py-8">Nothing Found</div>
          ): null}
          {feedbacks.map((feedback) => (
            <FeedbackItem
              {...feedback}
              key={feedback.id}
              onVoteChange={getVotes}
              openShow={() => openFeedbackItem(feedback)}
              votes={votes.filter((vote) => vote.feedbackId === feedback.id)}
            />
          ))}
    </div>
    )}
    </>
  )
}
