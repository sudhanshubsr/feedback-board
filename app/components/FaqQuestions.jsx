'use client';
import ChevronDown from "./icons/ChevronDown"
import ChevronUp from "./icons/ChevronUp";
import {useState} from "react";

export default function FaqQuestion({question, children}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-lg overflow-hidden my-4 w-full max-w-[700px] ">
      <button
        className="rounded flex gap-2 items-center bg-[--secondary] bg-opacity-50 md:text-xl p-4 cursor-pointer w-full"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {!isOpen && (
          <ChevronDown className="w-6 h-6 text-indigo-800" />
        )}
        {isOpen && (
          <ChevronUp  className="w-6 h-6 text-indigo-800" />
        )}
        {question}
      </button>
      {isOpen && (
        <div className="bg-[--secondary-light] max-w-[700px] bg-opacity-30 p-4 text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
}