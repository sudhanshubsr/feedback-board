import React, { useEffect, useMemo, useState } from 'react';
import Avatar from './Avatar';
import styles from '../components/css/HomeNavBottom.module.css';
import { useSession } from 'next-auth/react';
import SignoutPopOver from './SignoutPopOver';
import { useRouter } from 'next/navigation';

const MainHeader = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [userAvatar, setUserAvatar] = useState(user?.image || 'https://github.com/shadcn.png');
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
            <img src="https://s3-alpha-sig.figma.com/img/51b1/4282/d3096990dd511430b0079f1186c48254?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y61ZqZ~R7MK4iln95JmUq7nrs1WqGGWH5rY5dPwIvelWCdVtKo00mZxs022dtIm6l~a0I7FZ2EoieljiO-fErmWbpr54m6INI0AwwXbEeIDuSWX6rQeYk6cWpuXybih0THPupdgRfKNL4aRIQ-56nCfxETIotCNqZqqnx7xY9Uop9qwK3jLu0zJR~eTuY3lgbcCXd0f5rBkCsu1muQZAsH40xS0XPFJztFZoJ8GKfkW5kUDOrS~YmHoD~h1mYGo0sv9iFHJ8QlORSDjb8oGURmWihY4X5UXu8tj7QpN6Cw9CkscMZr6KBEyYb4XefKNHKqM9mH3dWLSLwh1spJKB7w__" alt="Logo" />
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
