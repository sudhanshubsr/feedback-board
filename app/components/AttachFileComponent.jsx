import React from 'react'
import { MoonLoader } from 'react-spinners'

const AttachFileComponent = ({isUploading, onInputChange}) => {
  return (
    <label className="flex gap-2 py-2 px-4 cursor-pointer text-gray-600 items-center">
        <MoonLoader color="#4B5563" loading={isUploading} size={16} />
        <span className={( isUploading ? "text-gray-400" : "text-gray-600" )}>{isUploading ? 'Uploading...': 'Attach Files'} </span>
        <input onChange={onInputChange} multiple type="file" className="hidden" />
    </label>
  )
}

export default AttachFileComponent