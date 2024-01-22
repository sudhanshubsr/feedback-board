'use client';
import { SessionProvider } from "next-auth/react";
import React from 'react'
import HomeNavBottom from "./components/HomeNavBottom";
import Avatar from "./components/Avatar";
import { HiMiniArrowLongRight } from "react-icons/hi2";

import styles from './components/css/main.module.css'
import Eclipse from "./components/icons/Eclipse";
export default function Home(){
  
  return (
    <SessionProvider>
      <main className={styles.maincontainer}>
        <div className={styles.header}>
        <div className={styles.headerImage}>
          <img src="https://s3-alpha-sig.figma.com/img/51b1/4282/d3096990dd511430b0079f1186c48254?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y61ZqZ~R7MK4iln95JmUq7nrs1WqGGWH5rY5dPwIvelWCdVtKo00mZxs022dtIm6l~a0I7FZ2EoieljiO-fErmWbpr54m6INI0AwwXbEeIDuSWX6rQeYk6cWpuXybih0THPupdgRfKNL4aRIQ-56nCfxETIotCNqZqqnx7xY9Uop9qwK3jLu0zJR~eTuY3lgbcCXd0f5rBkCsu1muQZAsH40xS0XPFJztFZoJ8GKfkW5kUDOrS~YmHoD~h1mYGo0sv9iFHJ8QlORSDjb8oGURmWihY4X5UXu8tj7QpN6Cw9CkscMZr6KBEyYb4XefKNHKqM9mH3dWLSLwh1spJKB7w__"></img>
        </div>
        <div className={styles.headerAvatar}>
          <Avatar url={"https://github.com/shadcn.png"}/>
        </div>    
      </div>

      <div className = {styles.headerHeading}>
        <h1>Your users will love <span>VoxBoards</span></h1>
      </div>
      <div className={styles.headerSubText}>
        <p>Experience a seamless, collaborative solution for user requests. Say goodbye to outdated spreadsheets and chaotic boards. Empower your customers, gain priceless insights</p>
      </div>
      <div className={styles.headerButton}>
        <button>Get Started </button>
        <HiMiniArrowLongRight />
      </div>
      
        <div className={styles.jumbotronImage}>
          <img src="https://s3-alpha-sig.figma.com/img/b03e/7209/0c1c9995db089f7719b4df6efa7803a7?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=evcdFGPdBdM8oFskcZP3CBiJknoeDDysXE580PZ73xcPlzk6W4VlDrm1kf8aOTmUy4vjtRkL92sW2~DkwX9~7t1G0~bezKsmJHHzPSe59pIc5uSryu4V3cUdhhosqE9wDENh15msCqyBoq2XNKwLu09Lo2K55ZKXHprFQMRcFCFREuWdLdhcFW5iTJvrt76nl5ZHEWnWq7xT9AN8gSE5Nc8V6LGkmjSuVdpJtxAFeNOL~hEkuBH6fCnnufnnPTCvIhIOCi6FADTFmiidScSYH4tVZOPb9ImGbt7BHRutnZ9bH8RgHPVt6RddjfIAjw70KMvygWYwEkvQEHFVBPacBg__" />
        </div>
        <div className={styles.jumbotronText}>
          <h1>Keep your users in the loop</h1>
          <p>Give your users a voice. Let them vote on feature requests and bug reports so you can build the right product.</p>
        </div>
        <div className={styles.jumbotronCircle}>
          <Eclipse />
        </div>
      </main>
      
    </SessionProvider>
  )
}

