document.getElementById('quoteForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = {
    name: form.name.value,
    email: form.email.value,
    contact: form.contact.value,
  };

  try {
    const response = await fetch('/api/handler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // Show success message
      form.reset();
    } else {
      alert(result.message); // Show specific error like "Invalid data"
    }
  } catch (error) {
    alert("Something went wrong. Try again later.");
    console.error("Error:", error);
  }
});
