// config.js

const { VITE_APP_LOCAL_URL_BACK, VITE_APP_PRODUCTION_URL_BACK } = import.meta.env

const config = () => {

  let backendUrl = '' 
  
  import.meta.env.MODE === 'development'
    ? backendUrl = VITE_APP_LOCAL_URL_BACK
    : backendUrl = VITE_APP_PRODUCTION_URL_BACK;

   return  backendUrl;
};

export default config;
