import axios from 'axios';

export function feedbackOpenNeeded(feedbacksFetchCount, pathname) {
    const regexResult = /\/feedback\/(?<id>[a-z0-9]+)/.exec(pathname);
    if (feedbacksFetchCount === 1 && regexResult?.groups?.id) {
      return regexResult?.groups?.id;
    } else {
      return false;
    }
  }

  export async function fetchFeedback(id) {
    const response = await axios.get(`/api/feedback?feedbackId=${id}`);
    return response.data;
  }

 export const postLoginActions = (getVotes, getFeedbacks, openFeedbackItem) => {
    const feedbackToVote = localStorage.getItem("feedback-id to vote");
    if (feedbackToVote) {
      axios.post('/api/vote', { feedbackToVote })
        .then(() => {
          localStorage.removeItem("feedback-id to vote");
          getVotes();
        });
    }

  const feedbackToPost = localStorage.getItem("feedbackToPost");
  if (feedbackToPost) {
    axios.post('/api/feedback', JSON.parse(feedbackToPost))
      .then(async (res) => {
        await getFeedbacks();
        openFeedbackItem(res.data);
        localStorage.removeItem("feedbackToPost");
      });
  }

  const commentToPost = localStorage.getItem("commentToPost");
  if (commentToPost) {
    const commentData = JSON.parse(commentToPost);
    axios.post('/api/comment', commentData)
      .then(async () => {
        const feedback = await fetchFeedback(commentData.feedbackId);
        openFeedbackItem(feedback);
        localStorage.removeItem("commentToPost");
      });
  }
}

