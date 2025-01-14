import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { PORT } from "./config/index.js";
import router from "./router/index.js";

import { errorHandler } from "./error/errorHandler.js";
import { normalLimiter } from "./middlewares/ratelimit.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(app);

export const io = new SocketServer(server, {
   cors: {
      origin: "*", 
      methods: ["GET", "POST"], 
   },
});

// Gestion des connexions WebSocket
io.on("connection", (socket) => {
   console.log("Nouvelle connexion WebSocket établie");

   socket.on("cartOpened", (data) => {
      // Logique de traitement de l'événement
      const responseData = { message: "Cart updated !" };

      // Réponse au client
      socket.emit("cartUpdated", responseData);
   });

   // Logique de gestion des événements WebSocket
   socket.on("disconnect", () => {
      console.log("Déconnexion WebSocket");
   });
});

app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(normalLimiter);
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

server.listen(PORT, () => {
   console.log(`Listening on port: ${PORT}`);
});



