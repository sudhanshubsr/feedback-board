import React from 'react'
import Image from 'next/image'
const Avatar = ({url=null}) => {
  return (
    <div className='rounded-full'>
      {!!url && (
        <Image
          src={url}
          width={56}
          height={56}
          className='rounded-full'
          alt='Avatar'
  
        />
      
      )}
    </div>
  )
}

export default Avatar