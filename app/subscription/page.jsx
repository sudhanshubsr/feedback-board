'use client';

import axios from "axios";
import {useEffect, useState} from "react";
import {MoonLoader} from "react-spinners";

export default function SubscriptionPage() {

  const [isLoading,setIsLoading] = useState(false);
  const [subscription,setSubscription] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/subscription').then(res => {
      setSubscription(res.data?.stripeSubscriptionData);
      setIsLoading(false);
    }).catch(err => {
      if (err.response.status === 401) {
        setIsLoading(false);
      }
    });
  }, []);

  function manageSubscriptionButtonClick() {
    axios.post('/api/portal').then(res => {
      window.location.href = res.data;
    });
  }

  function handleGoProButtonClick() {
    axios.post('/api/subscription').then(res => {
      window.location.href = res.data;
    })
  }

  const isCancelled = !!subscription?.object.cancel_at;
  const endTime = new Date(subscription?.object.current_period_end*1000);
  let humanReadableEndTime;
  if (subscription) {
    humanReadableEndTime = endTime?.toISOString().replace('T', ' ').substring(0, 16);
  }

  return (
    <div>
      <h1 className="text-center text-4xl mb-8">Your subscription</h1>
      {isLoading && (
        <div className="w-full flex justify-center">
          <MoonLoader size={36} />
        </div>
      )}
      {!isLoading && !subscription && (
        <div className="text-center">
          No active subscription
          <div className="flex justify-center">
            <button primary={1} className="my-4" onClick={handleGoProButtonClick}>
              Go PRO!
            </button>
          </div>
        </div>
      )}
      {subscription && (
        <div className="text-center">
          Your subscription is {isCancelled ? 'cancelled' : subscription.object.status}<br />
          {isCancelled && (
            <div>
              Your subscription ends:&nbsp;
              {humanReadableEndTime}
            </div>
          )}
          <div className="flex justify-center">
          <button className="flex items-center justify-center rounded-md w-[290px] bg-[--primary] text-white px-3 py-2 mt-5"
        onClick={manageSubscriptionButtonClick}>
        Manage Subscription
        </button>
          </div>
        </div>
      )}
    </div>
  );
}