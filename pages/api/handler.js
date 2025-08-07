export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, contact } = req.body;

  // Your validation here...

  try {
    const sheetUrl = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

    const formData = new URLSearchParams({
      name,
      email,
      contact,
    });

    const response = await fetch(sheetUrl, {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.text();

    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}
