/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { MoonLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import Button from "./Button";
import FeedbackItem from "./FeedbackItem";
import FeedbackItemModal from "./FeedbackItemModal";
import FeedbackModal from "./FeedbackModal";

export default function Board() {
  const [showFeedbackModalForm, setShowFeedbackModalForm] = useState(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [votes, setVotes] = useState([]);
  const [sort, setSort] = useState('votes');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [feedbackFetchCount, setFeedbackFetchCount] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [fetchingFeedbacks, setFetchingFeedbacks] = useState(true);
  const searchPhraseRef = useRef('');
  const sortValueRef = useRef('');
  const debouncedFetchFeedbacksRef = useRef(debounce(() => getFeedbacks(), 500));
  const pathname = usePathname();

  const {data: session} = useSession();
  const userEmail = session?.user?.email;
  
 // ! I got a issue here, as I am using debounced version of getFeedbacks function, it is not updating the sort value in the api call instaneously, it is taking the previous value of sort, so I am using useRef to store the value of sort and then using it in the api call to get the updated value of sort, this is a temporary solution, I will try to find a better solution for this

 useEffect(() => {
  getFeedbacks()
}, []);

 useEffect(() => {
  if(feedbackFetchCount === 0){
    return;
  }
    sortValueRef.current = sort;
    searchPhraseRef.current = searchPhrase;
    debouncedFetchFeedbacksRef.current();
}, [sort, searchPhrase]);

  useEffect(() => {
    if(feedbackFetchCount === 0){
      return;
    }
    if (openFeedbackModal) {
      window.history.pushState({}, null, `/feedback/${openFeedbackModal.id}`);
    } else {
      window.history.pushState({}, null, `/`);
    }
  }, [openFeedbackModal]);

  useEffect(() => {

    if (feedbackFetchCount <= 1 && /^\/feedback\/[0-9]+/.test(pathname)) {
      const feedbackId = pathname.split('/')[2];
      axios.get('/api/feedback?feedbackId=' + feedbackId)
        .then((response) => {
          setOpenFeedbackModal(response.data);
        });
    }
  }, [feedbackFetchCount, pathname]);

  useEffect(() => {
    getVotes();
  }, [feedbacks]);

  useEffect(() => {
    if (userEmail) {
      handleLocalStorageActions();
    }
  }, [userEmail]);

  const handleLocalStorageActions = () => {
    const feedbackToVote = localStorage.getItem("feedback-id to vote");
    if (feedbackToVote) {
      axios.post('/api/vote', { feedbackToVote })
        .then((res) => {
          localStorage.removeItem("feedback-id to vote");
          getVotes();
        });
    }

  const feedbackToPost = localStorage.getItem("feedbackToPost");
  if (feedbackToPost) {
    axios.post('/api/feedback', JSON.parse(feedbackToPost))
      .then(async (res) => {
        await getFeedbacks();
        setOpenFeedbackModal(res.data);
        localStorage.removeItem("feedbackToPost");
      });
  }

  const commentToPost = localStorage.getItem("commentToPost");
  if (commentToPost) {
    const commentData = JSON.parse(commentToPost);
    axios.post('/api/comment', commentData)
      .then(() => {
        axios.get('/api/feedback?feedbackId=' + commentData.feedbackId)
          .then((res) => {
            setOpenFeedbackModal(res.data);
            localStorage.removeItem("commentToPost");
          });
      });
  }
};

  const getFeedbacks = async () => {
    try {
      setFetchingFeedbacks(true);
      const res = await axios.get(`/api/feedback?sort=${sortValueRef.current}&search=${searchPhraseRef.current}`);
      setFeedbacks(res.data);
      setFeedbackFetchCount((prevCount) => prevCount + 1);
      setFetchingFeedbacks(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getVotes = async () => {
    try {
      const feedbackIds = feedbacks.map((feedback) => feedback.id).join(',');
      const res = await axios.get('/api/vote?feedbackIds=' + feedbackIds);
      setVotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openFeedbackModalForm = () => {
    setShowFeedbackModalForm(true);
  };

  const openFeedbackItem = (feedback) => {
    setOpenFeedbackModal(feedback);
  };

  const handleFeedbackUpdate = async (updatedFeedback) => {
    setOpenFeedbackModal((prevData) => ({ ...prevData, ...updatedFeedback }));
    if (updatedFeedback.status) {
      await getFeedbacks();
    }
  };

  return (
    <>
    <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded -lg md:mt-8 overflow-hidden mb-3">
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8">
        <h1 className="font-bold text-xl">VoxBoard</h1>
        <p className="text-opacity-90 text-slate-700">
          Elevate Your Insights, Unleash Collective Wisdom
        </p>
      </div>

  <div className="bg-gray-100 md:px-6 px-3 py-4 flex border-b">
  
  <div className="flex items-center gap-2">
  <select
  onChange={(ev) => {setSort(ev.target.value);
  }}
  className="block appearance-none bg-white border border-gray-300 py-2 px-1 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-sm" 
>
  <option value="votes">Most-Voted</option>
  <option value="latest">Latest</option>
  <option value="oldest">Oldest</option>
  <option value="planned">Planned</option>
  <option value="in-progress">In Progress</option>
  <option value="complete">Completed</option>
  <option value="archived">Archived</option>
  <option value="all">All</option> {/* Exprimental Feature  */}

</select>
<div>
  <input value={searchPhrase} onChange={ev => setSearchPhrase(ev.target.value)} type="text" placeholder="Search" className="border border-gray-300 py-2 px-1 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-sm"/>
</div>
</div>


        
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

      {/* Render loading state if fetchingFeedbacks is true */}
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
      

      {/* Render feedback modal form if showFeedbackModalForm is true */}
      {showFeedbackModalForm && <FeedbackModal setShow={setShowFeedbackModalForm} onCreate={getFeedbacks} />}

      {/* Render feedback item modal if openFeedbackModal is true */}
      {openFeedbackModal && (
        <FeedbackItemModal
          {...openFeedbackModal}
          feedback={openFeedbackModal}
          openShow={setOpenFeedbackModal}
          onFeedbackUpdate={handleFeedbackUpdate}
          votes={votes.filter((vote) => vote.feedbackId === openFeedbackModal.id)}
          onVoteChange={getVotes}
        />
      )}
    </main>
    
 </>
  );
}
