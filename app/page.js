'use client'
import React from 'react'
import { HiMiniArrowLongRight } from "react-icons/hi2";
import styles from './components/css/main.module.css'
import Eclipse from "./components/icons/Eclipse";
import Link  from "next/link"
import axios from 'axios';
import { useState } from 'react';

export default function Home(){

  const [emailsent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const handleNewsLetterButtonClick = (e) => {
    e.preventDefault();
    axios.post('/api/newsletter', {email: email}).then((res)=>{
      setEmailSent(true);
      setEmail('');
      console.log(res.data);
    }).catch((e)=>{
      console.log(e);   
    })
  }

  if(emailsent){
    setTimeout(()=>{
      setEmailSent(false);
    }, 4000)
  }
  
  return (
      <main className={styles.maincontainer}>

      <div className={styles.secondMaincontainer}>
        <div className={styles.jumbotron}>
          <div className = {styles.headerHeading}>
            <h1>Your users will love <span>VoxBoards</span></h1>
          </div>
          <div className={styles.headerSubText}>
            <p>Experience a seamless, collaborative solution for user requests. Say goodbye to outdated spreadsheets and chaotic boards. Empower your customers, gain priceless insights</p>
          </div>
          <div className={styles.headerButton}>
            <button><Link href='/login'> Get Started</Link> </button>
            <HiMiniArrowLongRight />
          </div>
        </div>
        <div className={styles.jumbotronImageContainer}>
              <div className={styles.jumbotronImage}>
                <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/voxboard/VoxboardNewImage1.png" alt='MainImage' />
              </div>      
        </div>
      </div>

        <div className={styles.jumbotronContainer}>
          <div className={styles.jumbotronText}>
            <h1>Keep your users in the loop</h1>
            <p>Give your users a voice. Let them vote on feature requests and bug reports so you can build the right product.</p>
            <div className={styles.jumbotronCircle}>
              <Eclipse />
            </div>
          </div>
      </div>
      <section className="py-10 px-6 w-full mb-20">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 ">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm gradient-top-left">
          <div className="p-6 flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
             strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-[--primary] mb-4"
            >
              <polyline points="9 17 4 12 9 7"></polyline>
              <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Collect Feedback</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Easily collect feedback from your customers through multiple channels.
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm gradient-top-left">
          <div className="p-6 flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
             strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-[--primary] mb-4"
            >
              <line x1="12" x2="12" y1="20" y2="10"></line>
              <line x1="18" x2="18" y1="20" y2="4"></line>
              <line x1="6" x2="6" y1="20" y2="16"></line>
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Analyze Feedback</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Analyze your feedback data with our powerful analytics tools.
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm gradient-top-left">
          <div className="p-6 flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
             strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-[--primary] mb-4"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Act on Feedback</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Take action based on your feedback data and improve your products and services.
            </p>
          </div>
        </div>
      </div>
    </section>


  <section className={styles.section}>
  <div className={styles.container}>
    <div className={styles.content}>
      <h2 className={styles.heading}>Experience the efficiency of top-tier teams by managing with our Feedback-boards.</h2>
      <p className={styles.paragraph}>Unleash your team's potential, shifting the focus from infrastructure to delivering impactful features.</p>
    </div>
    <div className={styles.form}>
      <form className={styles.flex}>
        <input className={styles.input} value={email} placeholder="Enter your email" type="email" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className={styles.button} onClick={handleNewsLetterButtonClick}>Sign Up</button>
      </form>
      <p className={styles.info}>{emailsent ? "Thank you for signing up!" : "Sign up for our beta and get early access to our product."}</p>
    </div>
  </div>
</section>

      </main>

  )
}

