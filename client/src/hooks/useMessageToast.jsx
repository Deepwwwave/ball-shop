import React, { useState, useEffect } from 'react';

// Gestion de la durée du message toast
const useMessageToast = (initialMessage = '', duration = 850) => {
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return [message, setMessage];
}

export default useMessageToast