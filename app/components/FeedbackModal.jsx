import axios from 'axios'
import { useState } from 'react'
import { MoonLoader, PropagateLoader, ScaleLoader } from "react-spinners"
import Button from "./Button"
import Popup from "./Popup"
import Attachmentclip from "./icons/Attachmentclip"
import Trash from "./icons/Trash"


export default function FeedbackModal({setShow}){

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploads, setUploads] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const handleCreatePostClick = (e) => {
    e.preventDefault()
    axios.post('/api/v1/feedback',{title,description})
    .then(()=>{
      setShow(false)
      console.log("feedback successfully created")
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleUploadFileonChange= async (e)=>{
      const files = [...e.target.files]
      setIsUploading(true)
      const uploadedFiles = new FormData()
      files.forEach((file)=>{
        uploadedFiles.append('file',file)
      })
      await axios.post('/api/v1/upload',uploadedFiles)
      .then((res)=>{
        setUploads([...uploads,...res.data]) 
        // setUploads(res.data)
        setIsUploading(false)
      })
      .catch(err=>{
        console.log(err)
      })

  }

  const handleRemoveFileClick = (link,e)=>{
    e.preventDefault()
    // axios.delete('/api/v1/upload',{data:{link}})
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
                        <div key={link.id} className="flex gap-2 h-16">
          
                          <a href={link} target="_blank" className="h-16 relative">
                            <button onClick={(e)=>{handleRemoveFileClick(link,e)}} className="absolute -right-1 -top-1  bg-red-400 shadow-md  rounded-md p-1 text-white">
                              <Trash className="w-4 h-4"/>
                            </button>
                          {/.(jpg|png|jpeg)$/.test(link) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={link} className="w-auto h-16 object-cover rounded-md"  alt="uploaded image"/>
                          ):(
                           <div className="bg-gray-300 h-16 rounded-md p-2 gap-2 flex items-center">
                            <Attachmentclip className="w-4 h-4"/>
                            {link.split('/')[3].substring(13)}
                            </div>
                          )}
                          </a>
                        </div>
                      ))}
                    </div>
                    </div>
                  )
                  } 
                  <div className="flex gap-2 mt-2 justify-end">
                  <label className="flex gap-2 py-2 px-4 cursor-pointer text-gray-600 items-center">
                   <MoonLoader color="#4B5563" loading={isUploading} size={16} />
                    <span className={( isUploading ? "text-gray-400" : "text-gray-600" )}>{isUploading ? 'Uploading...': 'Attach Files'} </span>
                    <input onChange={handleUploadFileonChange} multiple type="file" className="hidden" />
                  </label>
                  <Button  primary="true" className=""
                  onClick={handleCreatePostClick}>Create Post</Button>
                  </div>
              </form>
            </Popup>

  )
}
