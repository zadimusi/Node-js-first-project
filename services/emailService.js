const nodemailer = require("nodemailer");
// const AdminSmtp = require("../models/AdminSmtp");
// const EmailTemplate = require("../models/EmailTemplate");


// EMAIL_SETTINGS could be get from direct DB also
// const EMAIL_SETTINGS = require("../configs/email.config");
const sendMail = async (type, vars ={} , subject = null) => { 
//   let smtp = await AdminSmtp.findOne();
//   let emailTemplate = await EmailTemplate.findOne({emailType : type}) .lean({ getters: true });
  try {
    const smtpTransport = nodemailer.createTransport({
    //   host: smtp.host,
    //   service: "zoho", 
    //   port: smtp.port,
    //   secure: false,
    //   auth: {
    //     user: smtp.username,
    //     pass: smtp.password,
    //   },
    service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASSWORD
  }
    });
    // let body_message = emailTemplate.body;
    // Object.keys(vars).forEach(function (key, index) {
    //   body_message = body_message.replace(`{`+key+`}`, vars[key]);
    // });
    const mail = {
    //   from: emailTemplate.email,
    //   to: vars.email,
    //   subject: emailTemplate.subject,
    //   html: body_message,

    from: process.env.EMAIL_ID,
      to: 'test@gmail.com',
      subject: "asfdsf",
      html: "<h1>tesdfdsffdsting</h1>",
    };

    smtpTransport.sendMail(mail, (err, res) => {
      if (err) {
        console.log(err);
        smtpTransport.close();
        return {
          status: 422,
          message: "Error in sending mail.",
        };
      }

      return {
        status: 201,
        message: "Mail successfully sent.",
      };
    });
  } catch (error) {
    console.log("[catch block] Something went wrong email not sent",error);
    // console.log(error);
  }
};



module.exports = {
  sendMail,
};