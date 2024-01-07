import React from 'react'
import Button from './Button'
import { useState } from 'react'
import Avatar from './Avatar'
import FeedbackItemPopupCommentsForm from './FeedbackItemPopupCommentsForm'
const FeedbackItemPopupComments = () => {
    

    return (
        <div className='p-8'>
            <div className='flex gap-4 mb-8 '>
                <span><Avatar/></span>
                <div>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt officia voluptates porro molestiae dolorem harum impedit perspiciatis tempora. Quibusdam voluptatum placeat animi explicabo consequuntur amet ducimus numquam molestias doloremque nulla. </p>
                <div className='text-gray-4 00 mt-2 text-sm'>
                    Anonymous &middot; 2 hours ago
                </div>
                </div> 
            </div>
            <FeedbackItemPopupCommentsForm />
            
        </div>
      )
}

export default FeedbackItemPopupComments