import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import styles from '../components/css/HomeNavBottom.module.css';
import { useSession } from 'next-auth/react';
import SignoutPopOver from './SignoutPopOver';
import { useRouter } from 'next/navigation';

const MainHeader = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [userAvatar, setUserAvatar] = useState(user?.image || 'https://imagesprojects.s3.ap-south-1.amazonaws.com/account.png');
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarClick = () => {
    if (session?.user) {
      setIsOpen(!isOpen);
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    // Fetch or update user avatar when the session changes
    if (user?.image) {
      setUserAvatar(user.image);
    }
  }, [user]);



  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerImage}>
          <a href="/">
            <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/VoxboardNewLogo.png" alt='log'/>
          </a>
        </div>
        <div className={styles.headerAvatarContainer}>
          <div className={styles.headerAvatar}>
            <button onClick={handleAvatarClick}>
              <Avatar url={userAvatar} />
            </button>
          </div>
          {isOpen && (
            <div className={styles.signoutpopOver}>
              <SignoutPopOver setIsOpen={setIsOpen} user={user} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainHeader;
