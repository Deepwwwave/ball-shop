// config.js

const config = () => {

  let backendUrl = '' 
  
  import.meta.env.MODE === 'development'
    ? backendUrl = import.meta.env.VITE_APP_LOCAL_URL_BACK
    : backendUrl = process.env.APP_PRODUCTION_URL_BACK;
   return  backendUrl;
};

export default config;
