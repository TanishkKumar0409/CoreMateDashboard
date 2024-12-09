import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer"
import Admin from "../../modals/Admins/Admin.js";

const Mailer = async ({ userId, email, emailType }) => {
    try {

        var salt = bcryptjs.genSaltSync(10);
        var mailToken = bcryptjs.hashSync(JSON.stringify(userId), salt);

        if (emailType === "VERIFY") {
            await Admin.findOneAndUpdate({ userId },
                { $set: { verifyToken: mailToken, verifyTokenExpiry: Date.now() + 3600000 } },
                { new: true })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5832f6caafc9bd",
                pass: "1ec06c5bff684d"
            }
        });


        const mailSchema = {
            from: 'tanishkk60@gmail.com',
            to: email,
            subject: `hello ${email}`,
            text: "Hello world?",
            html: `<Link to="">Verify</link>`,
        }

        const info = await transport.sendMail(mailSchema);
    } catch (error) {
        console.log(error)
    }
}

export default Mailer