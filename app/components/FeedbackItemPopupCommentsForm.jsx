import React from 'react'
import Button from './Button'
import AttachFileComponent from './AttachFileComponent'
import { useState } from 'react'
import Attachment from './Attachment'
const FeedbackItemPopupCommentsForm = () => {
    const [commentText, setCommentText] = useState('')
    const [uploads, setUploads] = useState([])

    const handleUpload = (newlinks)=>{
        setUploads([...uploads,...newlinks])
     }

     const handleRemoveFileClick = (e,link)=>{
        e.preventDefault()
        // axios.delete('/api/upload',{data:{link}})
        setUploads(uploads.filter((item)=>item !== link))
      }

    const handleCreateComment = (e) => {
        e.preventDefault()
        console.log(commentText)
        console.log(uploads)
    }

  return (
    <form>
                <textarea className='border rounded-md w-full p-2' placeholder='Let us Know What you think...' 
                value={commentText}
                onChange={(e)=>setCommentText(e.target.value)}
                />
                {uploads.length > 0 && (
                    <div>
                      <label className='block mt-2 mb-1 text-gray-700'>Files: </label>
                     
                      <div className="flex gap-2 mt-2">
                      {uploads.map((link)=>(
                        <Attachment key={link.id} link={link} handleRemoveFileClick={(e,link)=>handleRemoveFileClick(e,link)} showRemoveButton={true}/>
                      ))}
                    </div>
                    </div>
                  )
                  } 
                <div className='flex justify-end gap-2 mt-2'>
                    <AttachFileComponent onUploadFile={handleUpload}/>
                    <Button onClick={handleCreateComment} primary="true" disabled={commentText === ""}>Comment</Button>
                </div>
    </form> 
  )
}

export default FeedbackItemPopupCommentsForm