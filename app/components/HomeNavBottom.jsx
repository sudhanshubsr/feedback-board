import React from 'react'
import styles from '../components/css/HomeNavBottom.module.css'
import { MdCurrencyRupee } from "react-icons/md";
import { RiHome3Fill } from "react-icons/ri";
import { MdOutlineHelpOutline } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";


const HomeNavBottom = () => {
  return (

    <>
      <div className={styles.navbuttonscontainer}>
        <div><a href='/'><RiHome3Fill /></a></div>
        <div><a href='/pricing'><MdCurrencyRupee /></a></div>
        <div><a href='/help'><MdOutlineHelpOutline /></a></div>
        <div><a href='/account'><RiAccountCircleLine /></a></div>
      </div>
    </>

  )
}

export default HomeNavBottom