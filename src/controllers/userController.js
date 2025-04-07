// const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const upload = require('../middleware/uploadMiddleware');
const { sendEmail } = require('../services/emailService');

const userController = {
    Jobapply: async (req, res) => { 
        try { 
            upload.single('resume')(req, res, async (err) => { 
                if (err) { 
                    return res.status(400).json({ message: err.message }); 
                } 
       
                const { 
                    firstName, 
                    lastName, 
                    email, 
                    phoneNumber, 
                    message, 
                    consent 
                } = req.body; 
   
                const consentBoolean = consent === 'true'; 
       
                // Basic validation 
                if (!firstName || !lastName || !email || !phoneNumber || !consentBoolean) { 
                    return res.status(400).json({ message: 'All required fields must be filled' }); 
                } 
       
                // Construct email with professional styling 
                const mailOptions = { 
                    to: process.env.CAREERS_EMAIL,
                    subject: `New Job Application from ${firstName} ${lastName}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <title>New Job Application</title>
                        </head>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                            <div style="background-color: #015968; padding: 20px; text-align: center;">
                                <h1 style="color: white; margin: 0;">New Job Application</h1>
                            </div>
                            
                            <div style="padding: 20px; background-color: #f9f9f9;">
                                <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                                    <h2 style="color: #015968; margin-top: 0;">Applicant Details</h2>
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Full Name</strong></td>
                                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
                                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td>
                                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 10px;"><strong>Resume</strong></td>
                                            <td style="padding: 10px;">${req.file ? 'Attached' : 'Not provided'}</td>
                                        </tr>
                                    </table>

                                    <div style="margin-top: 20px;">
                                        <h3 style="color: #015968;">Message</h3>
                                        <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message || 'No message provided'}</p>
                                    </div>
                                </div>
                            </div>

                            <div style="background-color: #f2f2f2; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                                <p>© ${new Date().getFullYear()} Ezebit. All rights reserved.</p>
                            </div>
                        </body>
                        </html>
                    `,
                    attachments: req.file ? [{ filename: req.file.originalname, content: req.file.buffer }] : [] 
                }; 

                const { success, error } = await sendEmail('careers', mailOptions);
                if (success) {
                    return res.status(200).json({ message: 'Application submitted successfully' });
                } else {
                    return res.status(500).json({ messaYge: 'Failed to send application email', error }); 
                }
            }); 
        } catch (error) { 
            return res.status(500).json({ message: 'Failed to process application', error: error.message }); 
        } 
    },

    contactUs: async (req, res) => {
        try {
            const { firstName, lastName, email, phoneNumber, subject, message } = req.body;
            
            // Basic validation
            if (!firstName || !lastName || !email || !phoneNumber || !message) {
                return res.status(400).json({ message: 'All required fields must be filled' });
            }
            
            const mailOptions = {
                to: process.env.CONTACT_EMAIL,
                subject: `New Contact Form Submission from ${firstName} ${lastName}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <title>New Contact Form Submission</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                        <div style="background-color: #015968; padding: 20px; text-align: center;">
                            <h1 style="color: white; margin: 0;">New Contact Inquiry</h1>
                        </div>
                        
                        <div style="padding: 20px; background-color: #f9f9f9;">
                            <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                                <h2 style="color: #015968; margin-top: 0;">Contact Details</h2>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name</strong></td>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Subject</strong></td>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
                                    </tr>
                                </table>

                                <div style="margin-top: 20px;">
                                    <h3 style="color: #015968;">Message</h3>
                                    <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                                </div>
                            </div>
                        </div>

                        <div style="background-color: #f2f2f2; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                            <p>© ${new Date().getFullYear()} Ezebit. All rights reserved.</p>
                        </div>
                    </body>
                    </html>
                `
            };

            const { success, error } = await sendEmail('contact', mailOptions);
            if (success) {
                return res.status(200).json({ message: 'Contact form submitted successfully' });
            } else {
                return res.status(500).json({ error: 'Failed to send email', details: error });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    subscribe: async (req, res) => {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            
            const mailOptions = {
                to: process.env.NEWSLETTER_EMAIL,
                subject: 'New Newsletter Subscription',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <title>New Newsletter Subscription</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                        <div style="background-color: #015968; padding: 20px; text-align: center;">
                            <h1 style="color: white; margin: 0;">New Newsletter Subscription</h1>
                        </div>
                        
                        <div style="padding: 20px; background-color: #f9f9f9;">
                            <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                                <h2 style="color: #015968; margin-top: 0;">Subscription Details</h2>
                                <p style="font-size: 16px; margin-bottom: 20px;">A new user has subscribed to the newsletter:</p>
                                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                                    <p style="margin: 0;"><strong>Email Address:</strong> ${email}</p>
                                </div>
                            </div>
                        </div>

                        <div style="background-color: #f2f2f2; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                            <p>© ${new Date().getFullYear()} Ezebit. All rights reserved.</p>
                        </div>
                    </body>
                    </html>
                `
            };

            const { success, error } = await sendEmail('newsletter', mailOptions);
            if (success) {
                return res.status(200).json({ message: 'Subscription successful' });
            } else {
                return res.status(500).json({ error: 'Failed to send email', details: error });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = userController;