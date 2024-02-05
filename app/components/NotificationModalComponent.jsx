'use client'
import React, { useEffect } from 'react'
import NotificationBell from './icons/NotificationBell'
import { useSession } from 'next-auth/react'
import { useState} from 'react'
import axios from 'axios'
import TimeAgo from 'timeago-react'
import {useRouter} from 'next/navigation'


const NotificationButton = () => {
    const [notifications, setNotifications] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)
    const {status} = useSession();
    useEffect(() => {
        axios.get('/api/notification').then((res)=>{
            setNotifications(res.data)
        })
    },[status])
    const unreadnotifications = notifications?.filter(n => !n.read)

    if (status === 'unauthenticated') return null
    
    const handleNotificationModal = () => { 
        setShowNotifications(!showNotifications)
    }
    const handleReadAllButton = async() => {
        setNotifications([])
        await axios.delete('/api/notification')

    }

    const handleNotificationClick = async(e,n) =>{
        e.preventDefault();
        try{
        await axios.put('/api/notification',{id: n.id});
        window.open(`/board/${n.Feedback.boardName}/feedback/${n.Feedback.id}`, '_blank');
        setShowNotifications(false);
}catch(e){
    console.log(e)
}
}
        

  return (
    <>
        <button className='relative' onClick={handleNotificationModal}>
           {unreadnotifications.length >0 && (
                <div className='absolute top-[-6px] right-[-12px] bg-red-500 text-sm px-1 rounded-full'>{unreadnotifications.length}</div>
           )} 
            <NotificationBell />
        </button>
        {showNotifications && (
            <>
                <div class="rounded-lg border absolute shadow-sm  max-w-xs top-[55px] right-[-40px] bg-[--primary] text-white">
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="text-2xl font-semibold text-center whitespace-nowrap leading-none tracking-tight">Notifications</h3>
  </div>
  <div class="p-4">
  {notifications.length === 0 ? (
    <p className='text-center'>No notifications</p>
) : (
    notifications.map((n, i) => (
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 cursor-pointer text-left" key={i}
        onClick={(e)=>handleNotificationClick(e,n)}
        >
            <div className={`w-3 h-3 rounded-full ${!n.read ? 'bg-[--secondary]' : ''}`}></div>
            
            <div className="grid gap-1">
                <p className="text-sm font-medium">{`${n.sourceUserName} has ${n.type} on ${n.Feedback.title}`}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <TimeAgo datetime={n.createdAt} />
                </p>
            </div>
            
        </div>
    ))
)}
  </div>
  <div class="flex items-center p-6">
    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
    onClick={handleReadAllButton}
    >
     Clear All Notifications
    </button>
  </div>
</div>
            </>
        )}
    
    </>
  )
}

export default NotificationButton