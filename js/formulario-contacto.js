const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset();
            successMsg.style.display = 'block';
        } else {
            alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
        }
    } catch (error) {
        alert('Error de red o servidor.');
    }
});
