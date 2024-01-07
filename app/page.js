'use client';
import { SessionProvider } from "next-auth/react";
import Board from "@/app/components/FeedbackBoard";
import React from 'react'
import Header from '@/app/components/Header'


export default function Home(){
  
  return (
    <SessionProvider>
      <Header />
      <Board />
    </SessionProvider>
  )
}

