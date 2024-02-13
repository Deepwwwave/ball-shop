import React from 'react'
import styles from '../styles/Admin.module.css'
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../Components/NavbarAdmin';

export default function Admin() {
  return (
    <main className={styles.adminContainer}>
      <NavbarAdmin/>
      <Outlet/>
    </main>
  )
}
