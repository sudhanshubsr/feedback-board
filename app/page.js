'use client';
import { SessionProvider } from "next-auth/react";
import Board from "@/app/components/FeedbackBoard";
import React from 'react'



export default function Home(){
  
  return (
    <SessionProvider>
      <Board />
    </SessionProvider>
  )
}

