import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from '../styles/Admin.module.css'
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../Components/NavbarAdmin';

export default function Admin() {

  const userRole = useSelector((state) => state.user.userRole);
  const navigate = useNavigate();
 
  // Sécurité - accès page admin
  useEffect(() => {
    if (userRole > 2 || userRole === '') {
      navigate("/boutique");
    } 
 }, [userRole]);

  return (
    <main className={styles.adminContainer}>
      <NavbarAdmin/>
      <Outlet/>
    </main>
  )
}
