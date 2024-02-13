import axios from "axios";
import config from "../config";

let backendUrl = config();

/**** AUTHENTIFICATION ****/ 

// Middleware axios qui gère l'envoie et le stockage du token jwt.
const axiosTokenHandler = axios.create({
   baseURL: `${backendUrl}`,
});

// Envoie
axiosTokenHandler.interceptors.request.use(
   function (config) {

      const token = localStorage.getItem("token");
      const tokenSession = localStorage.getItem("tokenSession");
      
      if (token) {
         config.headers["x-access-token"] = token;
      }
      if(tokenSession) {
         config.headers["x-session-token"] = tokenSession;
      }
      
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

// Stockage
axiosTokenHandler.interceptors.response.use(
   function (response) {
      const token = response.data.token; // format de la réponse
      if (token) {
         console.log(response.data.token);
         localStorage.setItem("token", token);
      }
      return response;
   },
   function (error) {
      return Promise.reject(error);
   }
);

export default axiosTokenHandler;
