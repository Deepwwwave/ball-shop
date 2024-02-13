// Middleware pour valider l'adresse e-mail et le mot de passe
export const validateEmailAndPassword = (req, res, next) => {
   if (req.body.email) {
      const email = req.body.email;
      const emailRegex = /^\S+@\S+\.\S+$/;
      console.log(email.Regex)
      if (!emailRegex.test(email)) {
         return res.status(400).json({ status:400, msg: "Identifiant ou mot de passe incorrects.",  error: "L'adresse e-mail n'est pas dans un format valide" });
      }
      if (email.length > 128) {
         return res.status(400).json({ status:400, msg: "Identifiant ou mot de passe incorrects.",  error: "L'e-mail est trop long !" });
      }
   }

   if (req.body.password) {
      const password = req.body.password;
      if (password.length > 128 || password.length < 8) {
         return res.status(400).json({ status:400, msg: "Mot de passe incorrects.",  error: "Le mot de passe doit comporter au moins 8 caractères !" });
      }
      if (!password || password.length < 8) {
         return res.status(400).json({ status:400, msg: "Mot de passe incorrects.",  error: "Le mot de passe doit avoir au moins 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou 1 caractère spécial" });
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[!@#$%^&*])/;
      if (!passwordRegex.test(password)) {
         return res.status(400).json({ status:400, msg: "Mot de passe incorrects.",  error: "Le mot de passe doit avoir au moins 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou 1 caractère spécial" });
      }
   }

   next();
};
