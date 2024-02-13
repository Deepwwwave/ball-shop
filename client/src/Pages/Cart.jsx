// Cart.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Cart.module.css';

export default function Cart({ quantity }) {
  return (
    <div className={styles.cart}>
      <FontAwesomeIcon icon={faShoppingCart} />
      {quantity > 0 && <span className={styles.quantity}>{quantity}</span>}
    </div>
  );
}
