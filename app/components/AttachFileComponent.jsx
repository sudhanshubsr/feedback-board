import React from 'react'
import { MoonLoader } from 'react-spinners'
import { useState } from 'react'
import axios from 'axios'
const AttachFileComponent = ({onUploadFile}) => {

    const [isUploading, setIsUploading] = useState(false)
    const handleUploadFileonChange= async (e)=>{
        const files = [...e.target.files]
        setIsUploading(true)
        const uploadedFiles = new FormData()
        files.forEach((file)=>{
          uploadedFiles.append('file',file)
        })
        await axios.post('/api/upload',uploadedFiles)
        .then((res)=>{
          onUploadFile(res.data)
          setIsUploading(false)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  return (
    <label className="flex gap-2 py-2 px-4 cursor-pointer text-gray-600 items-center">
        <MoonLoader color="#4B5563" loading={isUploading} size={16} />
        <span className={( isUploading ? "text-gray-400" : "text-gray-600" )}>{isUploading ? 'Uploading...': 'Attach Files'} </span>
        <input onChange={handleUploadFileonChange} multiple type="file" className="hidden" />
    </label>
  )
}

export default AttachFileComponent