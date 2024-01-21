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
        <div><a href='#'><RiHome3Fill /></a></div>
        <div><a href='#'><MdCurrencyRupee /></a></div>
        <div><a href='#'><MdOutlineHelpOutline /></a></div>
        <div><a href='#'><RiAccountCircleLine /></a></div>
      </div>
    </>

  )
}

export default HomeNavBottom