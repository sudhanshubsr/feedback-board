import './globals.css'
import styles from './components/css/HomeNavBottom.module.css'
import HomeNavBottom from './components/HomeNavBottom'
export const metadata = {
  title: 'VoxBoard',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className={styles.mobilenavbar}>
          <HomeNavBottom />
        </div>
      </body>
    </html>
  )
}
