import { useEffect, useState } from "react";
import axios from "axios";
import FeedbackItem from "./FeedbackItem"
import FeedbackModal from "./FeedbackModal";
import FeedbackItemModal from "./FeedbackItemModal";
import Button from "./Button";
import { useSession } from "next-auth/react";

export default function Board() {
  const [showFeedbackModalForm, setShowFeedbackModalForm] = useState(false)
  const [openFeedbackModal, setopenFeedbackModal] = useState(false)

  const [feedbacks, setFeedbacks] = useState([])

  const openFeedbackModalForm = ()=>{
    setShowFeedbackModalForm(true);    
  }
  const openFeedbackItem = (feedback)=>{
    setopenFeedbackModal(feedback);
  }


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
  },[])
  const {data:session} = useSession()

  useEffect(()=>{
    if(session?.user?.email){
      const feedbackId = localStorage.getItem("feedback-id to vote")
      if(feedbackId){
        alert(feedbackId)
      }
    }
  },[session?.user?.email]) // [session?.user?.email] is a dependency array

    

  return (
    
    <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded -lg md:mt-8 overflow-hidden">
        {session?.user?.email && "Welcome "+session.user.email|| "Welcome Guest!"}
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
          return <FeedbackItem key={feedback.id} openShow={()=>openFeedbackItem(feedback)} {...feedback} />

        })}
      </div>

      {showFeedbackModalForm && <FeedbackModal setShow={setShowFeedbackModalForm} />}

      {openFeedbackModal && <FeedbackItemModal {...openFeedbackModal} feedback = {openFeedbackModal} openShow={setopenFeedbackModal}  />}
    </main>
    
  );
}