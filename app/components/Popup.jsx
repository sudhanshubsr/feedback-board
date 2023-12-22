import React from 'react'

const Popup = ({setShow,children, title}) => {
  return (
    // ? Change this as click outside to close

    <div className='fixed inset-0 bg-white md:bg-black md:bg-opacity-80 flex justify-center' onClick={()=>setShow(false)}>

    <button onClick={()=>setShow(false)} className="hidden md:block fixed top-4 right-4 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataslot="icon" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>

    </button>
      <div className='w-full md:mt-40'>
          <div className='bg-white md:max-w-2xl md:mx-auto md:rounded-lg overflow-hidden' onClick={(e)=>e.stopPropagation()}>
            <div className="relative min-h-[40px] md:min-h-0">
              <button className="absolute top-4 left-8 md:hidden text-gray-600 cursor-pointer"
              onClick={()=>setShow(false)} 
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" dataslot="icon" className="w-5 h-5">
<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>


              </button>
            </div>
            {!!title && (
                <h2 className='py-4 text-center border-b-2 '>
                {title}
                </h2>
                )}
                    {children}
          </div>
      </div>
  </div>
  )
}

export default Popup