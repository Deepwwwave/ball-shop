// config.js

const { VITE_APP_LOCAL_URL_CLIENT, VITE_APP_PRODUCTION_URL_CLIENT } = import.meta.env

const config = () => {

  let clientUrl = '' 
  
  import.meta.env.MODE === 'development'
    ? clientUrl = VITE_APP_LOCAL_URL_CLIENT
    : clientUrl = VITE_APP_PRODUCTION_URL_CLIENT;
   return  clientUrl;
};

export default config;
