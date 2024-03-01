// const nodeMailer = require("nodemailer");

// const mail = async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   var transporter = await nodeMailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "anyanwuifeanyi3@gmail.com",
//       pass: "yctyztzhgfcpixuj",
//     },
//   });

//   var mailOptions = {
//     name: name,
//     email: email,
//     subject: subject,
//     message: message,
//   };

//   await transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log("there was an error");
//     } else {
//       console.log("Email send: " + info.res);
//     }
//     res.redirect("/");
//   });
// };

// module.exports = mail;
