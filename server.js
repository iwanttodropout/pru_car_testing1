const express = require('express');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set SendGrid API key from Vercel Environment Variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: email, // recipient
    from: 'youremail@yourdomain.com', // verified sender in SendGrid
    subject: 'Thanks for your submission!',
    html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thanks for sharing your details! Our team will be reaching out to you shortly to chat about your options.</p>
      <p>In the meantime, just hang tight—we’ll be in touch soon.</p>
    `
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Email failed to send.' });
  }
});

// Required by Vercel
module.exports = app;
