'use client'
import { SessionProvider } from "next-auth/react";
import React from 'react'
import { HiMiniArrowLongRight } from "react-icons/hi2";

import styles from './components/css/main.module.css'
import Eclipse from "./components/icons/Eclipse";
import Link  from "next/link"
export default function Home(){
  
  return (
    <SessionProvider>
      <main className={styles.maincontainer}>


      <div className = {styles.headerHeading}>
        <h1>Your users will love <span>VoxBoards</span></h1>
      </div>
      <div className={styles.headerSubText}>
        <p>Experience a seamless, collaborative solution for user requests. Say goodbye to outdated spreadsheets and chaotic boards. Empower your customers, gain priceless insights</p>
      </div>
      <div className={styles.headerButton}>
        <button><Link href='/account'> Get Started</Link> </button>
        <HiMiniArrowLongRight />
      </div>
      
        <div className={styles.jumbotronContainer}>
          <div className={styles.jumbotronText}>
            <h1>Keep your users in the loop</h1>
            <p>Give your users a voice. Let them vote on feature requests and bug reports so you can build the right product.</p>
            <div className={styles.jumbotronCircle}>
              <Eclipse />
            </div>
          </div>
          <div className={styles.jumbotronImageContainer}>
            <div className={styles.jumbotronImage}>
              <img src="https://s3-alpha-sig.figma.com/img/b03e/7209/0c1c9995db089f7719b4df6efa7803a7?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=evcdFGPdBdM8oFskcZP3CBiJknoeDDysXE580PZ73xcPlzk6W4VlDrm1kf8aOTmUy4vjtRkL92sW2~DkwX9~7t1G0~bezKsmJHHzPSe59pIc5uSryu4V3cUdhhosqE9wDENh15msCqyBoq2XNKwLu09Lo2K55ZKXHprFQMRcFCFREuWdLdhcFW5iTJvrt76nl5ZHEWnWq7xT9AN8gSE5Nc8V6LGkmjSuVdpJtxAFeNOL~hEkuBH6fCnnufnnPTCvIhIOCi6FADTFmiidScSYH4tVZOPb9ImGbt7BHRutnZ9bH8RgHPVt6RddjfIAjw70KMvygWYwEkvQEHFVBPacBg__" />
            </div>
            
          </div>
        </div>
      </main>
      
    </SessionProvider>
  )
}

