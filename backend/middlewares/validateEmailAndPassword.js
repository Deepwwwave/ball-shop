// Middleware pour valider l'adresse e-mail et le mot de passe
export const validateEmailAndPassword = (req, res, next) => {
   if (req.body.email) {
      const email = req.body.email;
      const emailRegex = /^(?!$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
         return res.status(400).json({ status:400, msg: "L'adresse e-mail n'est pas dans un format valide"});
      }
      if ( email.length > 128) {
         return res.status(400).json({ status:400, msg: "L'e-mail est trop long !"});
      }
      console.log(email.lenght)
   }

   if (req.body.password) {
      const password = req.body.password;
      if (password.length > 128 || password.length < 8) {
         return res.status(400).json({ status:400, msg: "Le mot de passe doit avoir au moins 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou 1 caractère spécial"});
      }
      if (!password || password.length < 8) {
         return res.status(400).json({ status:400, msg: "Le mot de passe doit avoir au moins 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou 1 caractère spécial"});
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[!@#$%^&*])/;
      if (!passwordRegex.test(password)) {
         return res.status(400).json({ status:400, msg: "Le mot de passe doit avoir au moins 8 caractères, 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou 1 caractère spécial"});
      }
   }
   next();
};
