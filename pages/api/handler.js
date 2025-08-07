// Form submission handler
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('submitButton'); // 👈 Add this
  submitBtn.disabled = true; // 👈 Disable button
  submitBtn.textContent = 'Submitting...'; // 👈 Show loading

  const formData = {
    name: form.name.value,
    contact: form.contact.value,
    email: form.email.value,
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/your-web-app-url/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Submission successful!');
      form.reset();
    } else {
      alert('Something went wrong. Please try again later.');
    }
  } catch (error) {
    alert('Network error. Please try again later.');
  }

  submitBtn.disabled = false; // 👈 Re-enable button
  submitBtn.textContent = 'Get My Freebie'; // 👈 Reset text
});
