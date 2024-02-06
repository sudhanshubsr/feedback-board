import React from 'react';
import {signOut} from 'next-auth/react';
import axios from 'axios';
import { useEffect } from 'react';
const AccountInfoCard = ({user}) => {
  const [isPremium, setIsPremium] = React.useState(null);
  useEffect(() => {
    axios.get('/api/subscription')
      .then(res => {
        setIsPremium(res.data?.stripeSubscriptionData?.object?.status === 'active');
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
        }
      });
  }, []);

  function handleUpgradeButtonClick() {
    axios.post('/api/subscription').then(res => {
      window.location.href = res.data;
    });
  }
  function manageSubscriptionButtonClick() {
    axios.post("/api/portal").then((res) => {
      window.location.href = res.data;
    });
  }

  const handleSignout = async () => {
    await signOut({callbackUrl: '/login'});
  }
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="rounded-full w-24 h-24 border-4 border-gray-200 dark:border-gray-800 flex items-center justify-center bg-muted overflow-hidden object-cover">
        <span className="text-xl font-bold"><img src={user?.image} /></span>
      </div>
      <h2 className="text-2xl font-bold">{user?.name}</h2>
      <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400">{isPremium ? 'Premium Member' : 'Basic Member'}</span>
      </div>
 
      <div className="flex gap-4">
        {isPremium && (
          <button className="rounded-md text-sm font-medium border hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-[--primary] text-white"
          onClick={manageSubscriptionButtonClick}
          >
            Manage Subscription
          </button>
        )}
        {!isPremium && (
          <button className="rounded-md text-sm font-medium border hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-[--primary] text-white"
          onClick={handleUpgradeButtonClick}
          >
            Upgrade to Premium
          </button>
        )}
        
        <button className="rounded-md text-sm font-medium border bg-[--primary] text-white hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 disabled:cursor-not-allowed" disabled>
  Change Password
</button>

        
      </div>
      <button className="flex items-center justify-center rounded-md w-[290px] bg-[--primary] text-white px-3 py-2"
        onClick={handleSignout}>
        Sign Out
        </button>
    </div>
  );
};

export default AccountInfoCard;
