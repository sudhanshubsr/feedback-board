import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "./Button";
import FeedbackItem from "./FeedbackItem";
import FeedbackItemModal from "./FeedbackItemModal";
import FeedbackModal from "./FeedbackModal";

export default function Board() {
  // State for controlling the feedback modal form visibility
  const [showFeedbackModalForm, setShowFeedbackModalForm] = useState(false);

  // State for storing the currently open feedback modal
  const [openFeedbackModal, setopenFeedbackModal] = useState(false);

  // State for storing votes data
  const [votes, setVotes] = useState([]);
  
  // State for storing feedbacks data
  const [feedbacks, setFeedbacks] = useState([]);

  // Function to open the feedback modal form
  const openFeedbackModalForm = () => {
    setShowFeedbackModalForm(true);
  };

  // Function to open a specific feedback item
  const openFeedbackItem = (feedback) => {
    setopenFeedbackModal(feedback);
  };

  // Fetching the feedback items from the database
  const getFeedbacks = async () => {
    try {
      const res = await axios.get('/api/feedback');
      setFeedbacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to fetch feedbacks when component mounts or when feedbacks state changes
  useEffect(() => {
    getFeedbacks();
  }, [feedbacks]);

  // Fetching votes data from the database
  const getVotes = async () => {
    try {
      const feedbackIds = feedbacks.map((feedback) => feedback.id).join(',');
      const res = await axios.get('/api/vote?feedbackIds=' + feedbackIds);
      setVotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to fetch votes when component mounts or when feedbacks state changes
  useEffect(() => {
    getVotes();
  }, [feedbacks]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get user session information
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  // useEffect to handle user-related actions when user email changes
  useEffect(() => {
    if (userEmail) {
      // Check for feedback to vote in local storage
      const feedbackToVote = localStorage.getItem("feedback-id to vote");
      if (feedbackToVote) {
        axios.post('/api/vote', { feedbackToVote })
          .then((res) => {
            localStorage.removeItem("feedback-id to vote");
            getVotes();
          });
      }

      // Check for feedback to post in local storage
      const feedbackToPost = localStorage.getItem("feedbackToPost");
      if (feedbackToPost) {
        axios.post('/api/feedback', JSON.parse(feedbackToPost))
          .then(async (res) => {
            await getFeedbacks();
            setopenFeedbackModal(res.data);
            localStorage.removeItem("feedbackToPost");
          });
      }

      // Check for comment to post in local storage
      const commentToPost = localStorage.getItem("commentToPost");
      if (commentToPost) {
        const commentData = JSON.parse(commentToPost);
        axios.post('/api/comment', commentData)
          .then(() => {
            axios.get('/api/feedback?feedbackId=' + commentData.feedbackId)
              .then((res) => {
                setopenFeedbackModal(res.data);
                localStorage.removeItem("commentToPost");
              });
          });
      }
    }
  }, [userEmail]); // eslint-disable-line react-hooks/exhaustive-deps

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
        {/* Button to open the feedback modal form */}
        <Button
          onClick={openFeedbackModalForm}
          primary="true"
          className="bg-blue-500 py-2 px-4 rounded-md text-white text-opacity-90"
        >
          Make a Suggestion
        </Button>
      </div>

      <div className="px-8">
        {/* Render feedback items */}
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

      {/* Render feedback modal form if showFeedbackModalForm is true */}
      {showFeedbackModalForm && <FeedbackModal setShow={setShowFeedbackModalForm} onCreate={getFeedbacks} />}

      {/* Render feedback item modal if openFeedbackModal is true */}
      {openFeedbackModal && (
        <FeedbackItemModal
          {...openFeedbackModal}
          feedback={openFeedbackModal}
          openShow={setopenFeedbackModal}
          votes={votes.filter((vote) => vote.feedbackId === openFeedbackModal.id)}
          onVoteChange={getVotes}
        />
      )}
    </main>
  );
}
