'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react";
import Board from "../../../../components/Board.jsx";
import Header from '../../../../components/Header.jsx'
import { BoardInforProvider } from '../../../../utils/getPathname.js';

const FeedbackPage = () => {

  return (
    <SessionProvider>
      <BoardInforProvider>
      <Header />
        <Board />
      </BoardInforProvider>
    </SessionProvider>
  )
}

export default FeedbackPage