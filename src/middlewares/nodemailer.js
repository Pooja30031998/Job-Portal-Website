import mail from "nodemailer";
import JobModel from "../models/job_model.js";

const sendMail = async (req, res, next) => {
  const email = req.body.email;
  const transporter = mail.createTransport({
    service: "gmail",
    auth: {
      user: "poojapravin1998@gmail.com",
      pass: "caxichqvmptscpmi",
    },
  });
  const mailOptions = {
    from: "poojapravin1998@gmail.com",
    to: email,
    subject: "Job Application Received",
    text: "Job Application Confirmation",
    html: `<p><b>Dear Applicant,</b></p>
    <p>Thank you for applying to a job at Easily. We have received your application and are currently reviewing it.

    If your qualifications match our requirements, we will contact you for the next steps of the selection process.</p> 
    <p>Thank you for your interest in joining our team!</p> </br> <p>Best regards,</p> <p>The Easily Team</p>`,
  };
  try {
    const response = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
  next();
};

export default sendMail;
