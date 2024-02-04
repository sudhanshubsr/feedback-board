'use client'
import React from 'react'
import axios from 'axios'
const BoardFormComponent = ({
  boardId,
  boardName, 
  boardDescription, 
  setBoardName, 
  setBoardDescription, 
  boardUrl, 
  setBoardUrl, 
  handleSubmit,
  visibility,
  setVisibility,
  allowedEmails,
  setAllowedEmails,
  archiveStatus,
  setArchiveStatus,
  onUpdate

}) => {

  const handleArhiveStatus = (e) => {
    e.preventDefault();

    try{
        
      axios.put('/api/board', {boardName, boardDescription, boardId, boardUrl, visibility, allowedEmails:allowedEmails.split('\n'), archiveStatus:!archiveStatus}).then((res)=>{
            onUpdate();
            setArchiveStatus(prev => !prev);
            handleSubmit(e); 
            // !can remove handlesumbit(e) as it's main purpose is to close the modal for now
      })
      
    }catch(err){
        console.log(err);
    }
}

// ! Have to change this function handleArchiveStatus 




  return (
    <div className="w-full p-10 bg-white shadow-md rounded-md ">
    <form className="mt-2 pace-y-4">
      <div className="space-y-3 mb-3">
        {archiveStatus && (
          <div className="border boarder-2 border-black bg-orange-300 flex justify-center rounded mb-5 py-1 px-2 w-max font-bold">
          This Board is Archived!
        </div>
        )}
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
            // disabled={boardUrl !== '' && }
          />
        </div>
      </div>
      <div className="space-y-1 mb-6">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="url"
        >
          Visibility:
        </label>
        <div className="flex-col items-center rounded-md dark:border-gray-700">
          <div>
            <input
              type="radio"
              checked={visibility === 'public'}
              className="h-4 w-4 text-primary border-black-500 rounded cursor-pointer"
              id="public"
              name="visibility"
              onChange={() => setVisibility('public')}
            />
            <label
              htmlFor="public"
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Public
            </label>
          </div>
          <div>
            <input
              type="radio"
              checked={visibility === 'private'}
              className="h-4 w-4 text-primary border-black-500 rounded cursor-pointer"
              id="public"
              name="visibility"
              onChange={() => setVisibility('private')}
            />
            <label
              htmlFor="private"
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Invite-Only
            </label>
          </div>
        </div>
        {visibility === 'private' && (
        <>
          <div>
            <label> 
              <div className='mt-3'> Who should be able to access the board?</div>
              <div className='text-sm text-gray-500 mb-3'>
                List all email addresses separated by new line
              </div>
                <textarea className='w-full block  rounded-md  h-24 p-2'
            placeholder={'user1@example.com\nuser2@example.com\nuser@example.com'}
            value={allowedEmails}
            onChange={(e) => setAllowedEmails(e.target.value)}
            ></textarea>
            </label>
          </div>
        </>
        )}
      </div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[--primary] text-white"
        type="submit"
        onClick={handleSubmit}
        disabled={boardName === '' || boardUrl === '' ||visibility === 'private' && allowedEmails === ''}
      >
        Submit
      </button>
      {!!boardId && (
        <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[--secondary] text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full text-[--primary] font-semibold mt-2"
        type="submit"
        onClick={handleArhiveStatus}
      >
        {archiveStatus ? 'UnArhive Board' : 'Archive Board'}
      </button>
      )}
    </form>
  </div>
  )
}

export default BoardFormComponent