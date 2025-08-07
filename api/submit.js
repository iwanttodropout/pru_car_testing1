export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, contact, email } = req.body;

  // Basic validation
  if (
    !name ||
    !/^[89]\d{8}$/.test(contact) ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  // For now, just send success response
  return res.status(200).json({ message: 'Form submitted successfully' });
}
