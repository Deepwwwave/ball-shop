// config.js

const config = () => {

  let backendUrl = '' 
  
  import.meta.env.MODE === 'development'
    ? backendUrl = import.meta.env.VITE_APP_LOCAL_URL_BACK
    : backendUrl = ""
   return  backendUrl;
};


export default config;
