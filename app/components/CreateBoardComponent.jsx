import React from 'react'
import Popup from './Popup'
import { useState } from 'react'
import axios from 'axios'

const CreateBoardComponent = ({setOpenShow, onCreate}) => {
    const [boardName, setBoardName] = useState('');
    const [boardUrl, setBoardUrl] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            axios.post('/api/board',{boardName, boardUrl, boardDescription}).then((res)=>{
                setOpenShow(false);
                window.open(`/board/${boardUrl}`, '_blank');
                onCreate();
                setBoardName('');
                setBoardUrl('');
              })
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <Popup title={'Create a New Board'} setShow={setOpenShow}>

  <div className="w-full p-10 bg-white shadow-md rounded-md ">
    <form className="mt-2 pace-y-4">
      <div className="space-y-3 mb-3">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="name"
          placeholder="Enter Board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
      </div>
      <div className="space-y-3 mb-3">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          Description
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="name"
          placeholder="Enter Board name"
          value={boardDescription}
          onChange={(e) => setBoardDescription(e.target.value)}
        />
      </div>
      <div className="space-y-4 mb-6">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="url"
        >
          URL
        </label>
        <div className="flex items-center border border-gray-300 rounded-md dark:border-gray-700">
          <span className="px-3 text-gray-500 dark:text-gray-400">voxboard.com/board/</span>
          <input
            className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 border-0"
            id="url"
            placeholder="Enter url for your board"
            value={boardUrl}
            onChange={(e) => setBoardUrl(e.target.value)}
          />
        </div>
        
      </div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[--primary] text-white"
        type="submit"
        onClick={handleSubmit}
        disabled={boardName === '' || boardUrl === ''}
      >
        Submit
      </button>
    </form>
  </div>


    </Popup>
  )
}

export default CreateBoardComponent