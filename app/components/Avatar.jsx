import React from 'react'
import Image from 'next/image'
const Avatar = ({url=null}) => {
  return (
    <div className='rounded-full'>
      {!!url && (
        <Image
          src={url? url : 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png'}
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