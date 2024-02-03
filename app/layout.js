'use client'
import './globals.css'
import styles from './components/css/HomeNavBottom.module.css'
import HomeNavBottom from './components/HomeNavBottom'
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import MainHeader from './components/MainHeader';
import { SessionProvider } from "next-auth/react";


export default function RootLayout({ children }) {

  const pathname = usePathname();
  const isBoardPage = pathname.includes('/board/');
  const isAccountPage = pathname.includes('/account');
  return (
    <SessionProvider>
        <html lang="en">
              <Head>
                <title>VoxBoard</title>
              </Head>
              <body>
                {isBoardPage && (
                  <>{children}</>
                )}
                {isAccountPage && !isBoardPage && (
                  <>
                  {children}
                  <div className={styles.mobilenavbar}>
                      <HomeNavBottom />
                    </div>
                  </>
                )}
                {!isBoardPage && !isAccountPage &&(
                  <>
                    <MainHeader />
                    {children}
                    <div className={styles.mobilenavbar}>
                      <HomeNavBottom />
                    </div>
                  </>
                )}
              </body>
        </html>
    </SessionProvider>

  )
}
