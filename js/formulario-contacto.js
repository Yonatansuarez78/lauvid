// Inicializa EmailJS (reemplaza con tu USER ID real)
emailjs.init("rSR6jMUd1gOKaLGmE");

const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    // Validación de campos vacíos
    if (!name || !email || !message) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos requeridos',
            html: 'Debes completar al menos <b>nombre</b>, <b>correo</b> y <b>mensaje</b>.',
            confirmButtonColor: '#f39c12'
        });
        return;
    }

    // Mostrar los datos en una alerta antes de enviar
    Swal.fire({
        title: '¿Enviar este mensaje?',
        icon: 'question',
        html: `
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Correo:</b> ${email}</p>
        <p><b>Tema:</b> ${subject || 'Sin tema'}</p>
        <p><b>Mensaje:</b> ${message}</p>
        <hr>
        <small>¿Los datos son correctos?</small>
      `,
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#aaa',
    }).then((result) => {
        if (result.isConfirmed) {
            // Enviar con EmailJS
            emailjs.sendForm('service_rzywoku', 'template_bx7g9cm', form)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Mensaje enviado!',
                        text: 'Gracias por contactarnos. Te responderemos pronto.',
                        confirmButtonColor: '#28a745'
                    });
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error al enviar:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de envío',
                        text: 'No se pudo enviar el mensaje. Inténtalo más tarde.',
                        confirmButtonColor: '#d33'
                    });
                });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Envio cancelado',
                text: 'Puedes corregir los datos antes de enviar.',
                confirmButtonColor: '#6c757d'
            });
        }
    });
});