export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, contact } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[89]\d{7}$/;

  if (
    !name ||
    !email ||
    !contact ||
    !emailRegex.test(email) ||
    !contactRegex.test(contact)
  ) {
    return res.status(400).json({ message: "Invalid data" });
  }

  console.log("Contact form submitted:", { name, email, contact });

  // Do stuff here: send email, save to DB, etc

  return res.status(200).json({ message: "Form received successfully!" });
}
