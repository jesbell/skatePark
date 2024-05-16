let usuarioId;
        
// Función para obtener usuario
function obtenerDatosUsuario() {
    axios.get('/usuario', {
        headers: {
            Authorization: localStorage.getItem('token') // Obtener el token
        }
    })
    .then(function(response) {
        const usuario = response.data;
        document.getElementById('email').value = usuario.email;
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('password').value = usuario.password;
        document.getElementById('password2').value = usuario.password;
        document.getElementById('anos_experiencia').value = usuario.anos_experiencia;
        document.getElementById('especialidad').value = usuario.especialidad;
        usuarioId = usuario.id;
        
    })
    .catch(function(error) {
        console.error('Error al obtener los datos del usuario:', error);
        alert('Error al obtener los datos del usuario');
    });
}
// funcion para eliminar usuario
function eliminarUsuario() {
    
    axios.delete('/usuario/' + usuarioId, {
        headers: {
            Authorization: localStorage.getItem('token') // Obtener el token
        },
        timeout: 5000
    })
    .then(function(response) {
        alert('Usuario eliminado correctamente');
        window.location.href = '/';
    })
    .catch(function(error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario');
    });
}

// funcion editar usuario
function editarUsuario(){
    const datos = new FormData(document.querySelector('form'));
    const usuarioData = {
    nombre: datos.get('nombre'),
    password: datos.get('password'),
    anos_experiencia: datos.get('anos_experiencia'),
    especialidad: datos.get('especialidad'),
};
    axios.put('/usuario/' + usuarioId, usuarioData, {
        headers: {
            Authorization: localStorage.getItem('token') // Obtener el token
        }
    })
    .then(function(response) {
        alert(response.data.message);
    })
    .catch(function(error) {
        console.error('Error al editar usuario:', error);
        alert('Error al editar usuario');
    });
}

window.onload = function() {            
    document.getElementById('eliminarUsuario').addEventListener('click', eliminarUsuario);
    document.getElementById('editarUsuario').addEventListener('click', editarUsuario);
    obtenerDatosUsuario();
};