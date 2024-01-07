import React from 'react'
import Attachmentclip from "./icons/Attachmentclip"
import Trash from "./icons/Trash"
const Attachment = ({link, showRemoveButton=false, handleRemoveFileClick}) => {

  return (
    <div key={link.id} className="flex gap-2 h-16 ">
      <a href={link} target="_blank" className="h-16 relative">
        {showRemoveButton && 
        <button onClick={(e)=>{handleRemoveFileClick(e,link)}} className="absolute -right-1 -top-1  bg-red-400 shadow-md  rounded-md p-1 text-white">
          <Trash className="w-4 h-4"/>
        </button>
        }
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
  )
}

export default Attachment