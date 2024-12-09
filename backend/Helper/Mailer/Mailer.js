import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import Admin from "../../modals/Admins/Admin.js";

const Mailer = async ({ userId, email, emailType }) => {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const mailToken = bcryptjs.hashSync(JSON.stringify(userId), salt);

        if (emailType === "VERIFY") {
            await Admin.findOneAndUpdate(
                { _id: userId },
                {
                    $set: {
                        verifyToken: mailToken,
                        verifyTokenExpiry: Date.now() + 3600000,
                    },
                },
                { new: true }
            );
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5832f6caafc9bd",
                pass: "1ec06c5bff684d",
            },
        });

        const verificationLink = `http://localhost:3000/dashboard/user/add?token=${mailToken}`;
        const mailSchema = {
            from: 'tanishkk60@gmail.com',
            to: email,
            subject: "Verify Your Account",
            text: "Please verify your account.",
            html: `<p>Click the link below to verify your account:</p>
                   <a href="${verificationLink}" target="_blank">Verify</a>`,
        };

        const info = await transport.sendMail(mailSchema);
        console.log("Verification email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending verification email: ", error.message);
    }
};

export default Mailer;
