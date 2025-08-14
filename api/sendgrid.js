const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, contact } = req.body;

  const msg = {
    to: email,
    from: 'youremail@yourdomain.com', // replace with your verified SendGrid sender
    subject: 'Thanks for your submission!',
    html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thanks for sharing your details! Our team will be reaching out to you shortly to chat about your options.</p>
      <p>In the meantime, just hang tight—we’ll be in touch soon.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Thanks for signing up! We will be in touch.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email failed to send.' });
  }
}
