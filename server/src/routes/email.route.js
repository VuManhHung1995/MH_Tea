const express = require("express");
const nodeMailer = require("nodemailer");

const emailRoute = express.Router();

emailRoute.get("/", (req, res) => {
  const { email, name } = req.query;
  const sendEmail = async () => {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      //   secure: true,
      auth: {
        user: "vumanhhung18101995@gmail.com",
        pass: "nmjk bitp hfqi payl",
      },
    });
    const mailOption = {
      from: "vumanhhung18101995@gmail.com",
      to: email,
      subject: "Order Successed!!!!!",
      text: `Hello [${name}],

      We’re happy to let you know that we’ve received your order.
      
      Once your package ships, we will send you an email with a tracking number and link so you can see the movement of your package.
      
      If you have any questions, contact us here or call us on [contact number]!
      
      We are here to help!`,
    };
    await transporter.sendMail(mailOption, (error, result) => {
      if (error) {
        res.status(500).json({
          status: 500,
          devMsg: error,
        });
      } else {
        res.status(200).json({
          status: 200,
          data: result,
        });
      }
    });
  };
  sendEmail();
});

module.exports = emailRoute;
