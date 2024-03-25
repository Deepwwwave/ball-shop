import React from 'react';
import styles from '../styles/Footer.module.css';
import { NavLink } from 'react-router-dom';


export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <NavLink to="/CGV">Conditions générales</NavLink>
      <NavLink to="/mentions-legales">Mentions légales</NavLink>
      <p>Contact: 0750683382</p>
    </div>
  )
}
