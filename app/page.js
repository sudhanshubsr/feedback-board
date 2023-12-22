'use client';
import { useState } from "react";

import FeedbackItem from "./components/FeedbackItem";
import FeedbackModal from "./components/FeedbackModal";
import FeedbackItemModal from "./components/FeedbackItemModal";

import Button from "./components/Button";

export default function Home() {
  const [showFeedbackModalForm, setShowFeedbackModalForm] = useState(false)
  const [openFeedbackModal, setopenFeedbackModal] = useState(false)
  const openFeedbackModalForm = ()=>{
    setShowFeedbackModalForm(true);    
  }
  const openFeedbackItem = (feedback)=>{
    setopenFeedbackModal(feedback);
  }

  const Feedbacks = [
    { 
      id: 1,
      title: 'Please post more Videos1',
      description: 'I would like to see more videos on the topic of React and NextJS',
      votesCount: 10,
    },
    {
      id: 2,
      title: 'Please post more Videos2',
      description: 'I would like to see more videos on the topic of React and NextJS',
      votesCount: 14,
    },
    {
      id: 3,
      title: 'Please post more Videos3',
      description: 'I would like to see more videos on the topic of React and NextJS',
      votesCount: 13,
    }
  ]


  return (
    <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded -lg md:mt-8 overflow-hidden">
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
        {Feedbacks.map((feedback)=>{
          return <FeedbackItem key={feedback.id} openShow={()=>openFeedbackItem(feedback)} {...feedback} />

        })}
      </div>

      {showFeedbackModalForm && <FeedbackModal setShow={setShowFeedbackModalForm} />}

      {openFeedbackModal && <FeedbackItemModal {...openFeedbackModal} feedback = {openFeedbackModal} openShow={setopenFeedbackModal}  />}
    </main>
  );
}