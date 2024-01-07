import axios from 'axios'
import { useState } from 'react'
import Button from "./Button"
import Popup from "./Popup"
import Attachment from './Attachment'
import AttachFileComponent from './AttachFileComponent'



export default function FeedbackModal({setShow, onCreate}){

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploads, setUploads] = useState([])
  
  const handleCreatePostClick = (e) => {
    e.preventDefault()
    axios.post('/api/feedback',{title,description, uploads})
    .then(()=>{
      setShow(false)
      onCreate()
      console.log("feedback successfully created")

    })
    .catch(err=>{
      console.log(err)
    })
  }

 const handleUpload = (newlinks)=>{
    setUploads([...uploads,...newlinks])
 }

  const handleRemoveFileClick = (e,link)=>{
    e.preventDefault()
    // axios.delete('/api/upload',{data:{link}})
    setUploads(uploads.filter((item)=>item !== link))
  }


  return (
    <Popup setShow={setShow} title={"Make a Suggestion"}>
      <form className='p-8'>
                  <label className='block mt-4 mb-1 text-gray-700'>Title</label>
                  <input 
                  className='w-full border p-2 rounded-md' 
                  type='text' 
                  placeholder='A short, descriptive title'
                  onChange={(e)=>setTitle(e.target.value)}
                  value={title}
                  />

                  <label className='block mt-4 mb-1 text-gray-700'>Details</label>
                  <textarea 
                  className='w-full border p-2 rounded-md' 
                  placeholder='Describe your suggestion'
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                  />
                  {uploads.length > 0 && (
                    <div>
                      <label className='block mt-2 mb-1 text-gray-700'>Attachments</label>
                     
                      <div className="flex gap-2 mt-2">
                      {uploads.map((link)=>(
                        <Attachment key={link.id} link={link} handleRemoveFileClick={(e,link)=>handleRemoveFileClick(e,link)} showRemoveButton={true}/>
                      ))}
                    </div>
                    </div>
                  )
                  } 
                  <div className="flex gap-2 mt-2 justify-end">
                  <AttachFileComponent onUploadFile={handleUpload} />
                  <Button  primary="true" className=""
                  onClick={handleCreatePostClick}>Create Post</Button>
                  </div>
              </form>
            </Popup>

  )
}
