document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    axios.post('/login', formData)
    .then(function(response) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        alert("Se ha conectado exitosamente");
        /* window.location.href = `/datos?token=${token}`;  */
        window.location.href = '/datos';
    })
    .catch(function(error) {
        console.error('Error:', error);                    
        alert('Error al iniciar sesión: ' + error.response.data);
        
    });
});