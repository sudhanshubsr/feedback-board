import React from 'react'
import Button from './Button'
import { useState } from 'react'
import Avatar from './Avatar'
const FeedbackItemPopupComments = () => {
    const [commentText, setCommentText] = useState('')

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
            <form>
                <textarea className='border rounded-md w-full p-2' placeholder='Let us Know What you think...' 
                value={commentText}
                onChange={(e)=>setCommentText(e.target.value)}
                />
                <div className='flex justify-end gap-2 mt-2'>
                    <Button>Attach Files</Button>
                    <Button primary="true" disabled={commentText === ""}>Comment</Button>
                </div>
            </form> 
        </div>
      )
}

export default FeedbackItemPopupComments