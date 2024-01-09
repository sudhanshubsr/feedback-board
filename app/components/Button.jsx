import React from 'react'

//most of the times children prop here will be text or icon or both
const Button = (props) => {
  
  return (
    <button
      {...props}
      
      disabled={props.disabled}
      className={"py-2 px-4 rounded-md text-opacity-90 flex items-center gap-2 mr-1 " + (props.className || '') + ' '
      +(props.primary ? 'bg-blue-500 text-white' : 'text-black bg-gray-300 ')
      +(props.disabled ? ' bg-gray-200 text-black  cursor-not-allowed' : '')
    }
    />
  );
};

export default Button;

