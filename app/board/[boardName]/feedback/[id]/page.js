'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react";
import Board from "../../../../components/Board.jsx";
import Header from '../../../../components/Header.jsx'
import { BoardInfoProvider } from '../../../../utils/getPathname.js';

const FeedbackPage = () => {

  return (
    <SessionProvider>
      <BoardInfoProvider>
      <Header />
        <Board />
      </BoardInfoProvider>
    </SessionProvider>
  )
}

export default FeedbackPage