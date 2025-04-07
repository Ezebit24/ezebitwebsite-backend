const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const createTransporter = (type) => {
    const config = emailConfig[type];
    return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.auth,
        tls: {
            rejectUnauthorized: false
        }
    });
};

const sendEmail = async (type, mailOptions) => {
    try {
        const transporter = createTransporter(type);
        await transporter.verify();
        mailOptions.from = emailConfig[type].auth.user;
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

module.exports = { sendEmail };