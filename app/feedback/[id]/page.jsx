'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react";
import Board from "../../components/FeedbackBoard.jsx";
import Header from '../../components/Header.jsx'
const FeedbackPage = () => {
  return (
    <SessionProvider>
        <Header />
        <Board />
    </SessionProvider>
  )
}

export default FeedbackPage