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
        <button className="relative inline-flex items-center  text-sm font-medium text-center text-black " onClick={handleNotificationModal}>
           {unreadnotifications.length >0 && (
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{unreadnotifications.length}</div>
           )} 
            <NotificationBell />
        </button>
        {showNotifications && (
            <>
                <div className="rounded-lg border absolute shadow-sm  max-w-xs top-[60px] right-[0px] bg-[--primary] text-white">
  <div className="flex flex-col space-y-1.5 p-6">
    <h3 className="text-2xl font-semibold text-center whitespace-nowrap leading-none tracking-tight">Notifications</h3>
  </div>
  <div className="p-4">
  {notifications.length === 0 ? (
    <p classNameName='text-center'>No notifications</p>
) : (
    notifications.map((n, i) => (
        <div classNameName="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 cursor-pointer text-left" key={i}
        onClick={(e)=>handleNotificationClick(e,n)}
        >
            <div classNameName={`w-3 h-3 rounded-full ${!n.read ? 'bg-[--secondary]' : ''}`}></div>
            
            <div classNameName="grid gap-1">
                <p classNameName="text-sm font-medium">{`${n.sourceUserName} has ${n.type} on ${n.Feedback.title}`}</p>
                <p classNameName="text-sm text-gray-500 dark:text-gray-400">
                    <TimeAgo datetime={n.createdAt} />
                </p>
            </div>
            <hr></hr>
        </div>

    ))
)}
  </div>
  <div className="flex items-center p-6">
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
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