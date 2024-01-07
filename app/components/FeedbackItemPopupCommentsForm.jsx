import React from 'react'
import Button from './Button'
import AttachFileComponent from './AttachFileComponent'
import { useState } from 'react'
const FeedbackItemPopupCommentsForm = () => {
    const [commentText, setCommentText] = useState('')
  return (
    <form>
                <textarea className='border rounded-md w-full p-2' placeholder='Let us Know What you think...' 
                value={commentText}
                onChange={(e)=>setCommentText(e.target.value)}
                />
                <div className='flex justify-end gap-2 mt-2'>
                    <AttachFileComponent isUploading={false} onInputChange={()=>{}}/>
                    <Button primary="true" disabled={commentText === ""}>Comment</Button>
                </div>
    </form> 
  )
}

export default FeedbackItemPopupCommentsForm