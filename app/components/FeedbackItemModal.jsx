import React from 'react'
import Popup from './Popup'
import Button from './Button'
import FeedbackItemPopupComments from './FeedbackItemPopupComments'
const FeedbackItemPopup = ({title,description,openShow, votesCount}) => {
  return (

    <Popup title={''} setShow={openShow}>
        <div className='p-8 pb-2 '>
            <h2 className='text-lg font-bold mb-2 '>{title}</h2>
            <p className='text-gray-600'>{description}</p>
            <div className='flex justify-end  px-8 py-2  border-b'>
            <Button primary="true">
                <span>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="currentColor"
                dataslot="icon"
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
                </span>
                Upvote {votesCount}
            </Button>
            </div>
            <div>
                <FeedbackItemPopupComments/>
            </div>

        </div> 
    </Popup>
    
    
  )
}

export default FeedbackItemPopup