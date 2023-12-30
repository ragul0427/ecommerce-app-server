var nodemailer = require("nodemailer");



var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ragulhp27@gmail.com",
    pass: "jdug ctow bzoi ujak",
  },
});

const sendPasswordResetMail = (email, otp, otpUri) => {
 
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: "Password Reset",
    text: `Use the following OTP ${otp} to reset your password OTP URI ${otpUri}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error sending email", err);
    } else {
      console.log("Email send success:", info.response);
    }
  });
};

module.exports = { sendPasswordResetMail };
