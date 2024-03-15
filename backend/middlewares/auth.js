import jwt from "jsonwebtoken";
import "dotenv/config";

const { TOKEN_SECRET, TOKEN_SECRET_SESSION } = process.env;

// Check le token jwt et le rôle pour l'accès à l'admin
const checkToken = (expectedRole, uuidActived) => (req, res, next) => {
   const TOKEN = req.headers["x-access-token"];
   if (!TOKEN) {
      return res.status(400).json({ status: 400, msg: "Il n'y a pas de token !" });
   }
   jwt.verify(TOKEN, TOKEN_SECRET, (err, decoded) => {
      if (err) {
         console.error("Erreur de vérification du token :", err);
         return res.status(401).json({ status: 401, msg: "Token non valide" });
      } else if (decoded.role <= expectedRole) {
         if (uuidActived) {
            req.params.uuid = decoded.uuid;
         }
         return next();
      } else {
         res.status(403).json({ status: 403, msg: "e-mail expiré !", msgAuth: " Accès interdit " });
      }
   });
};

export const checkTokenSuperAdmin = checkToken("1");
export const checkTokenAdmin = checkToken("2");
export const checkTokenCustomer = checkToken("3", "uuidActived");

// Refresh token : génère un nouveau token si le token de session est valide
export const refreshToken = (req, res, next) => {
   const TOKEN_SESSION = req.headers["x-session-token"]
   if (!TOKEN_SESSION) {
      return res.status(404).json({ status: 404, msg: "Aucun token de session" });
   } else {
      jwt.verify(TOKEN_SESSION, TOKEN_SECRET_SESSION, (err, decoded) => {
         if (err) {
            return res.status(401).json({ status: 401, msg: "Token expiré ou invalide" });
         } else {
            const PAYLOAD = { uuid: decoded.uuid, role: decoded.role, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
            req.newToken = jwt.sign(PAYLOAD, TOKEN_SECRET);
            req.role = decoded.role;
            req.uuid = decoded.uuid;
            next();
         }
      });
   }
};

// retourne le nouveau token quand il est actualisé 
//( utilisé que au chargement du site pour retourné le nouveau token )
export const renderToken = (req, res, next) => {
   const newToken = req.newToken;
   const role = req.role;
   const uuid = req.uuid;
   res.status(200).json({ status: 200, msg: "Token actualisé !", token: newToken, role: role, uuid: uuid });
   next();
};


//**************VERSION HTTP_ONLY *******************************/

// // Refresh token : génère un nouveau token si le token de session est valide
// export const refreshToken = (req, res, next) => {
//    if (!req.cookies.tokenSession) {
//       return res.status(404).json({ status: 404, msg: "Aucun token de session" });
//    } else {
//       jwt.verify(req.cookies.tokenSession, TOKEN_SECRET_SESSION, (err, decoded) => {
//          if (err) {
//             return res.status(401).json({ status: 401, msg: "Token expiré" });
//          } else {
//             const PAYLOAD = { uuid: decoded.uuid, role: decoded.role, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
//             req.newToken = jwt.sign(PAYLOAD, TOKEN_SECRET);
//             next();
//          }
//       });
//    }
// };

// // retourne le nouveau token quand il est actualisé 
// //( utilisé que au chargement du site pour retourné le nouveau token )
// export const renderToken = (req, res, next) => {
//    const newToken = req.newToken;
//    res.status(200).json({ status: 200, msg: "Token actualisé !", newToken: newToken, sessionToken: req.cookies.tokenSession });
//    next();
// };
