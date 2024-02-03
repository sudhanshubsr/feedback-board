import React from 'react';
import { usePathname } from 'next/navigation';
import styles from '../components/css/HomeNavBottom.module.css';
import { MdCurrencyRupee } from 'react-icons/md';
import { RiHome3Fill } from 'react-icons/ri';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HomeNavBottom = () => {
  const pathname = usePathname(); // Get current path
  const {data:session} = useSession();
  const getIconsize = (path) => {
    return pathname === path ? '34' : ''; // 
  };
  const getIconColor = (path) => {
    return pathname === path ? 'black' : '';
  };

  return (
    <>
      <div className={styles.navbuttonscontainer}>
        <div>
          <Link href='/'>
            <RiHome3Fill size={getIconsize('/')} color={getIconColor('/')} />
          </Link>
        </div>
        <div>
          <Link href='/pricing'>
            <MdCurrencyRupee size={getIconsize('/pricing')} color={getIconColor('/pricing')} />
          </Link>
        </div>
        <div>
          <Link href='/help'>
            <MdOutlineHelpOutline size={getIconsize('/help')}  color={getIconColor('/help')}/>
          </Link>
        </div>
        <div>
          <Link href={session?.user ? '/account' : '/login'}>
            <RiAccountCircleLine size={getIconsize('/login')} color={getIconColor('/login')}/>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeNavBottom;
