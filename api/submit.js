document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const contact = form.contact.value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const button = document.getElementById("submitButton");

  // Inline validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[89]\d{7}$/;

  if (!name || !emailRegex.test(email) || !contactRegex.test(contact)) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Please enter valid info in all fields!";
    return;
  }

  errorMsg.style.display = "none";

  // Show loading
  button.disabled = true;
  button.classList.add("loading");
  button.textContent = "Submitting...";

  try {
    const res = await fetch("/api/handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, contact }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Form submitted!");
      form.reset();
    } else {
      throw new Error(result.message || "Submission failed.");
    }
  } catch (err) {
    errorMsg.style.display = "block";
    errorMsg.textContent = err.message;
  } finally {
    button.disabled = false;
    button.classList.remove("loading");
    button.textContent = "Submit";
  }
});
