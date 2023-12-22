import React from 'react'

const FeedbackItem = ({title, description, openShow,votesCount}) => {
  return (
    <div  className="flex gap-8 items-center my-8 b">
          <a href='' onClick={(e)=>{e.preventDefault(); openShow();}}>
            <h2 className='font-bold'>{title}</h2>
            <p className="text-gray-600 text-sm">
              {description}
            </p>
          </a>
          <div>
            <button className="shadow-sm shadow-gray-200 border rounded-md py-1 px-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                dataslot="icon"
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
              {votesCount}
            </button>
          </div>
        </div>
  )
}

export default FeedbackItem