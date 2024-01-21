'use client';
import { SessionProvider } from "next-auth/react";
import React from 'react'
import HomeNavBottom from "./components/HomeNavBottom";

export default function Home(){
  
  return (
    <SessionProvider>
      <main>
          
      </main>
      <HomeNavBottom />
    </SessionProvider>
  )
}

