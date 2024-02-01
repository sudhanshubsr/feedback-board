import React from 'react'
import Button from './Button'
const BoardHeader = ({setSort, searchPhrase, setSearchPhrase, openFeedbackModalForm}) => {
  return (
    <>
    <div className="gradient-top-left p-8">
        <h1 className="font-bold text-xl">VoxBoard</h1>
        <p className="text-opacity-90 text-slate-700">
          Elevate Your Insights, Unleash Collective Wisdom
        </p>
      </div>

      <div className="bg-[--platinum] md:px-6 px-3 py-4 flex border-b">
          
        <div className="flex items-center gap-2">
          <select
          onChange={(ev) => {setSort(ev.target.value);
          }}
          className="block appearance-none bg-white border border-gray-400 py-2 px-1 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue text-sm" 
        >
          <option value="all">All</option> {/* Exprimental Feature  */}
          <option value="votes">Most-Voted</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Completed</option>
          <option value="archived">Archived</option>
          

        </select>
        <div>
          <input value={searchPhrase} onChange={ev => setSearchPhrase(ev.target.value)} type="text" placeholder="Search" className="border border-gray-400 py-2 px-1 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue text-sm"/>
        </div>
        </div>
        <div className="grow"></div>
        {/* Button to open the feedback modal form */}
        <button
          onClick={openFeedbackModalForm}
          className="bg-[--primary] py-2 px-4 rounded-md text-white text-opacity-90"
        >
          Make a Suggestion
        </button>
      </div>

    </>
  )
}

export default BoardHeader