import React from 'react'

//most of the times children prop here will be text or icon or both
const Button = (props) => {
  
  return (
    <button
      {...props}
      
      disabled={props.disabled}
      className={"py-2 px-4 rounded-md text-opacity-90 flex items-center gap-2 " + (props.className || '') + ' '
      +(props.primary ? 'bg-blue-500 text-white' : 'text-gray-600')
      +(props.disabled ? ' bg-gray-200 text-gray-400 cursor-not-allowed' : '')
    }
    />
  );
};

export default Button;

