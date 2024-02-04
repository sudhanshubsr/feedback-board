/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { usePathname } from "next/navigation";
import FeedbackItemModal from "./FeedbackItemModal";
import FeedbackModal from "./FeedbackModal";
import getPathname from "../utils/getPathname";
import { feedbackOpenNeeded, fetchFeedback, postLoginActions } from "../utils/boardHelperFunc";
import BoardHeader from "./BoardHeader";
import { BoardBody } from "./BoardBody";
import { BoardInfoContext } from "../utils/getPathname";
import { useContext } from "react";
export default function Board() {
  const [showFeedbackModalForm, setShowFeedbackModalForm] = useState(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [votes, setVotes] = useState([]);
  const [sort, setSort] = useState('all');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [feedbackFetchCount, setFeedbackFetchCount] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [fetchingFeedbacks, setFetchingFeedbacks] = useState(true);
  const searchPhraseRef = useRef('');
  const sortValueRef = useRef('all');
  const debouncedFetchFeedbacksRef = useRef(debounce(() => getFeedbacks(), 500));
  const pathname = usePathname();
  const {data: session} = useSession();
  const boardName = getPathname();

 // ! I got a issue here, as I am using debounced version of getFeedbacks function, it is not updating the sort value in the api call instaneously, it is taking the previous value of sort, so I am using useRef to store the value of sort and then using it in the api call to get the updated value of sort, this is a temporary solution, I will try to find a better solution for this

  //? This useEffect is used to get the feedbacks, it will run when the component mounts
  useEffect(() => {
    getFeedbacks()
  }, []);


  //? This useEffect is used to get the votes of the feedbacks, it will run when the feedbacks state changes
  useEffect(() => {
    getVotes();
  }, [feedbacks]);

  //? This useEffect is used to get the feedbacks when the user changes the sort value or search phrase, it will run when the sort or searchPhrase state changes
  useEffect(() => {
    if(feedbackFetchCount === 0){
    return;
  }
    sortValueRef.current = sort;
    searchPhraseRef.current = searchPhrase;
    debouncedFetchFeedbacksRef.current();
}, [sort, searchPhrase]);

  //? This useEffect is used to update the url when the user clicks on the feedback item, it will update the url with the feedback item id, so that the user can share the feedback item link with others and when they click on the link, it will open the feedback modal with the feedback item data

  useEffect(() => {
    if(feedbackFetchCount === 0){
      return;
    }
    const url = openFeedbackModal ? `/board/${boardName}/feedback/${openFeedbackModal.id}` : `/board/${boardName}`;
    window.history.pushState({}, '', url);
  }, [openFeedbackModal]);

  //? This useEffect is used to open the feedback modal when the user clicks on the feedback item link shared by someone, it will open the feedback modal with the feedback item data

  useEffect(() => {
    const idToOpen = feedbackOpenNeeded(feedbackFetchCount, pathname);
    if (idToOpen) {
      fetchFeedback(idToOpen).then((feedback) => {
        setOpenFeedbackModal(feedback);
      });
    }
  }, [feedbackFetchCount]);


  //? This useEffect is used to submit the feedack, vote, or comment after user logsIn, if there is any data in the localStorage, it will submit the data to the server and then clear the localStorage

  useEffect(() => {
    if(!session?.user?.email){
      return
    }
    postLoginActions(getVotes, getFeedbacks, openFeedbackItem)
  }, [session]);


  const getFeedbacks = async () => {
    try {
      setFetchingFeedbacks(true);
      const res = await axios.get(`/api/feedback?sort=${sortValueRef.current}&search=${searchPhraseRef.current}&boardName=${boardName}`);
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
    getFeedbacks();
  };


  return (
    <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded -lg md:mt-8 overflow-hidden mb-3">
      
      <BoardHeader openFeedbackModalForm={openFeedbackModalForm} setSort={setSort} setSearchPhrase={setSearchPhrase} searchPhrase={searchPhrase} />
      
      <BoardBody feedbacks={feedbacks} votes={votes} openFeedbackItem={openFeedbackItem} getVotes={getVotes} fetchingFeedbacks={fetchingFeedbacks}/>
     
      {showFeedbackModalForm && <FeedbackModal setShow={setShowFeedbackModalForm} onCreate={getFeedbacks} />}

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
  );
}
