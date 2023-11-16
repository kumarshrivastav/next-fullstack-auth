import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import ConnectDB from "@/dbConfig/dbConfig";
// ConnectDB();
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedToken = await bcryptjs.hash(userId.toString(), salt);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokneExpiry: Date.now() + 3600000,
        }
      );
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "90eb6a59663c71",
        pass: "3d90959628d70f",
      },
    });

    const mailOptions = {
      from: "kumarshrivastav1024@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "reset your password",
      html: `<p>Click <a href="${
        emailType === "VERIFY"
          ? `${process.env.DOMAIN_NAME}/verifyemail?token=${hashedToken}`
          : `${process.env.DOMAIN_NAME}/resetpassword/bymail?token=${hashedToken}&id=${userId}`
      }">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
