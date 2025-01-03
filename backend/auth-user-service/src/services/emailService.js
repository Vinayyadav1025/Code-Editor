import nodemailer from 'nodemailer';

export const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS, // App Password
        },
    });
    

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
    };

    try {
        console.log('Sending OTP...');
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (err) {
        console.log('Error sending OTP to email:', err);
    }
};
