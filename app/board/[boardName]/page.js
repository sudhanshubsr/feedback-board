'use client';
import { SessionProvider } from "next-auth/react";
import Board from "../../../app/components/Board.jsx";
import React from 'react'
import Header from '../../../app/components/Header.jsx'
import { BoardInforProvider } from "../../utils/getPathname.js";


export default function Home(){
  return (
    <SessionProvider>
      <BoardInforProvider>
        <Header />
        <Board />
      </BoardInforProvider>
    </SessionProvider>
  )
}

