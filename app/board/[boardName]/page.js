'use client';
import { SessionProvider } from "next-auth/react";
import Board from "../../../app/components/Board.jsx";
import React from 'react'
import Header from '../../../app/components/Header.jsx'
import { BoardInfoProvider } from "../../utils/getPathname.js";


export default function Home(){

  

  return (
    <SessionProvider>
      <BoardInfoProvider>
        <Header />
        <Board />
      </BoardInfoProvider>
    </SessionProvider>
  )
}

