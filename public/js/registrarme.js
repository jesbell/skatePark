$(document).ready(function() {
    $('#registro_Form').submit(function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    axios.post('/registro', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
    })
    .then(function(response) {
        alert(response.data.message);
        $('#registro_Form')[0].reset(); // limpiando datos del formulario
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});
});