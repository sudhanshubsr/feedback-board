'use client'
import './globals.css'
import styles from './components/css/HomeNavBottom.module.css'
import Avatar from "./components/Avatar";
import HomeNavBottom from './components/HomeNavBottom'
import { usePathname } from 'next/navigation';
import Head from 'next/head';


export default function RootLayout({ children }) {

  const pathname = usePathname();
  const isBoardPage = pathname.includes('/board/');
  return (
    <html lang="en">
      <Head>
        <title>VoxBoard</title>
      </Head>
      <body>
        {isBoardPage && (
          <>{children}</>
        )}
        {!isBoardPage && (
          <>
            <div className={styles.header}>
              <div className={styles.headerImage}>
                <a href="/"><img src="https://s3-alpha-sig.figma.com/img/51b1/4282/d3096990dd511430b0079f1186c48254?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y61ZqZ~R7MK4iln95JmUq7nrs1WqGGWH5rY5dPwIvelWCdVtKo00mZxs022dtIm6l~a0I7FZ2EoieljiO-fErmWbpr54m6INI0AwwXbEeIDuSWX6rQeYk6cWpuXybih0THPupdgRfKNL4aRIQ-56nCfxETIotCNqZqqnx7xY9Uop9qwK3jLu0zJR~eTuY3lgbcCXd0f5rBkCsu1muQZAsH40xS0XPFJztFZoJ8GKfkW5kUDOrS~YmHoD~h1mYGo0sv9iFHJ8QlORSDjb8oGURmWihY4X5UXu8tj7QpN6Cw9CkscMZr6KBEyYb4XefKNHKqM9mH3dWLSLwh1spJKB7w__"></img></a>
              </div>
              <div className={styles.headerAvatar}>
                <Avatar url={"https://github.com/shadcn.png"}/>
              </div>    
            </div>
            {children}
            <div className={styles.mobilenavbar}>
              <HomeNavBottom />
            </div>
          </>
        )}
      </body>
    </html>
  )
}
