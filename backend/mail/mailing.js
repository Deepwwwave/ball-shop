import nodemailer from "nodemailer";

const { DOMAIN_CLIENT, SERVICE_MAIL, USER_MAIL, APP_PASSWORD_MAIL } = process.env;

let domainClient = DOMAIN_CLIENT || process.env.VERCEL_URL || 'http://localhost:5173'

// MAIL D'ENVOI POUR VALIDATION DU COMPTE
export const mailValidateAccount = (mailTo, subject, title, text, uuid) => {
   const transporter = nodemailer.createTransport({
      service: SERVICE_MAIL,
      auth: {
         user: USER_MAIL,
         pass: APP_PASSWORD_MAIL,
      },
   });

   const mailOptions = {
      from: USER_MAIL,
      to: mailTo,
      subject: subject,
      text: "",
      html: `<b>${title}</b><p>${text}<p><a href='${domainClient}/validate-account/${uuid}'>Valider mon compte</a>`,
   };

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log("Erreur, Mail non envoyé !");
         return console.log(error);
      } else {
         console.log("Message %s sent: %s", info.messageId, info.response);
      }
   });
};

// MAIL D'ENVOI POUR L'OUBLI DU MOT DE PASSE
export const mailForgottenPassword = (mailTo, subject, title, text, uuid) => {
   const transporter = nodemailer.createTransport({
      service: SERVICE_MAIL,
      auth: {
         user: USER_MAIL,
         pass: APP_PASSWORD_MAIL,
      },
   });

   const mailOptions = {
      from: USER_MAIL,
      to: mailTo,
      subject: subject,
      text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe`,
      html: `<b>${title}</b><p>${text}<p><a href='${domainClient}/update-password/${uuid}'>Réinitialiser mon mot de passe</a>`,
   };

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log("Erreur, Mail non envoyé !");
         return console.log(error);
      } else {
         console.log("Message %s sent: %s", info.messageId, info.response);
      }
   });
};
