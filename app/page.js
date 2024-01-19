'use client';
import { SessionProvider } from "next-auth/react";
import React from 'react'

export default function Home(){
  
  return (
    <SessionProvider>
        <h1>Home</h1>
    </SessionProvider>
  )
}

