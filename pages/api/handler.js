export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, contact } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[89]\d{7}$/;

  if (!name || !emailRegex.test(email) || !contactRegex.test(contact)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    // Replace with YOUR deployed Apps Script URL
    const sheetUrl = "https://script.google.com/macros/s/AKfycbyLCWQRKRQvI1s5xQrEpgnoP3fZ8KrfKQH_EcrRzOopHdFW2_D5nLAJxE_TSNFHqn1RPg/exec";

    const response = await fetch(sheetUrl, {
      method: "POST",
      body: JSON.stringify({ name, email, contact }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();
    console.log("Sheet response:", data);

    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}
