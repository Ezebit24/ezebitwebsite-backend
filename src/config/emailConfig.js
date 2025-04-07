const emailConfig = {
    careers: {
        host: process.env.CAREERS_SMTP_HOST,
        port: process.env.CAREERS_SMTP_PORT,
        secure: process.env.CAREERS_SMTP_PORT === '465',
        auth: {
            user: process.env.CAREERS_EMAIL,
            pass: process.env.CAREERS_PASSWORD
        }
    },
    contact: {
        host: process.env.CONTACT_SMTP_HOST,
        port: process.env.CONTACT_SMTP_PORT,
        secure: process.env.CONTACT_SMTP_PORT === '465',
        auth: {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.CONTACT_PASSWORD
        }
    },
    newsletter: {
        host: process.env.NEWSLETTER_SMTP_HOST,
        port: process.env.NEWSLETTER_SMTP_PORT,
        secure: process.env.NEWSLETTER_SMTP_PORT === '465',
        auth: {
            user: process.env.NEWSLETTER_EMAIL,
            pass: process.env.NEWSLETTER_PASSWORD
        }
    }
};

module.exports = emailConfig;