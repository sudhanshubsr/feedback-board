
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import FeedbackItem from "./FeedbackItem";
import FeedbackItemModal from "./FeedbackItemModal";
import FeedbackModal from "./FeedbackModal";

export default function Board() {
  const [showFeedbackModalForm, setShowFeedbackModalForm] = useState(false)
  const [openFeedbackModal, setopenFeedbackModal] = useState(false)
  const [votes, setVotes] = useState([])

  const [feedbacks, setFeedbacks] = useState([])

  const openFeedbackModalForm = ()=>{
    setShowFeedbackModalForm(true);    
  }
  const openFeedbackItem = (feedback)=>{
    setopenFeedbackModal(feedback);
  }

  // ! Fetching the feedbacks items from the database
  const getFeedbacks = async ()=>{
    try{
        const res = await axios.get('/api/feedback')
        setFeedbacks(res.data)
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    getFeedbacks()
  },[feedbacks])

  // ! Fetching the votes from the database
  const getVotes = async ()=>{
    try{
        const feedbackIds = feedbacks.map((feedback)=>feedback.id).join(',')
        const res = await axios.get('/api/vote?feedbackIds='+feedbackIds)
        setVotes(res.data)
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    getVotes()
  },[feedbacks])

  const {data:session} = useSession()
  const userEmail = session?.user?.email

  useEffect(()=>{
    if(userEmail){
      const feedbackId = localStorage.getItem("feedback-id to vote")
      if(feedbackId){
        axios.post('/api/vote', {feedbackId})
        .then((res)=>{
          localStorage.removeItem("feedback-id to vote")
          getVotes();
        })
      }
    }
  },[userEmail]) // [userEmail] is a dependency array

  return (
    <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded -lg md:mt-8 overflow-hidden mb-3">
    
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8">
        <h1 className="font-bold text-xl">VoxBoard</h1>
        <p className="text-opacity-90 text-slate-700">
        Elevate Your Insights, Unleash Collective Wisdom
        </p>
      </div>
      <div className="bg-gray-100 md:px-6 px-3 py-4 flex border-b">
        <div className="grow"></div>
        <Button onClick={openFeedbackModalForm} primary="true" className="bg-blue-500 py-2 px-4 rounded-md text-white text-opacity-90">
          Make a Suggestion
        </Button>
      </div>

      <div className="px-8">
        {feedbacks.map((feedback)=>{
          return <FeedbackItem {...feedback}
          key={feedback.id}
          onVoteChange={getVotes}
          // parentLoadingVotes={votesLoading}
          openShow={()=>openFeedbackItem(feedback)} 
          votes = {votes.filter((vote)=>vote.feedbackId === feedback.id)}
          />
        })}
      </div>

      {showFeedbackModalForm && <FeedbackModal setShow={setShowFeedbackModalForm} onCreate={getFeedbacks}/>}

      {openFeedbackModal && <FeedbackItemModal {...openFeedbackModal} 
      feedback = {openFeedbackModal} 
      openShow={setopenFeedbackModal} 
      votes={votes.filter((vote)=>vote.feedbackId === openFeedbackModal.id)} 
      onVoteChange={getVotes}
      />}
    </main>
  );
}