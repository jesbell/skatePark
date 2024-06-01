document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    //console.log(token);
    if (!token) {
        window.location.href = '/login';
        return;
    }
    // Se buscan los datos del usuario, enviando token
    axios.get('/usuario', {
        headers: {
        Authorization: token
        }
    })
    .then(function(response) {
        const user = response.data;
        const userDataForm = document.getElementById('userData');
        // Se construye el formulario con los datos del usuario
        userDataForm.innerHTML = `
            <div class="form-group row w-50 m-auto">
                <div class="form-group col-12 col-sm-6">
                    <label>Email</label>
                    <input
                    class="form-control m-auto" name="email" type="email" id="email" value="${user.email}"
                    disabled
                    />
                </div>
                <div class="form-group col-12 col-sm-6">
                    <label>Nombre</label>
                    <input class="form-control m-auto" name="nombre" type="text" id="nombre" value="${user.nombre}" required />
                </div>
                <div class="form-group col-12 col-sm-6">
                    <label>Password</label>
                    <input
                    type="password" name="password" id="password" value="${user.password}" required
                    class="form-control m-auto"
                    />
                </div>
                <div class="form-group col-12 col-sm-6">
                    <label>Repita la password</label>
                    <input
                    type="password"
                    class="form-control m-auto"
                    id="password2"
                    value="${user.password}"
                    />
                </div>
                <div class="form-group col-12 col-sm-6">
                    <label>Años de experiencia</label>
                    <input class="form-control m-auto" name="anos_experiencia" type="number" id="anos_experiencia" value="${user.anos_experiencia}" required/>
                </div>
                <div class="form-group col-12 col-sm-6">
                    <label>Especialidad</label>
                    <input class="form-control m-auto" name="especialidad" type="text" id="especialidad" value="${user.especialidad}" required/>
                </div>
            </div>
            <div class="mb-1">
                <button type="button" class="btn btn-primary" id="editarUsuario">Actualizar</button>
            </div>
            <div>
                <button type="button" class="btn btn-danger" id="eliminarUsuario">Eliminar cuenta</button>
            </div>
            `;
        
        // Botón editar usuario    
        document.getElementById('editarUsuario').addEventListener('click', function() {
            const datos = new FormData(document.querySelector('form'));
            const usuarioData = {
                email: datos.get('email'),
                nombre: datos.get('nombre'),
                password: datos.get('password'),
                anos_experiencia: datos.get('anos_experiencia'),
                especialidad: datos.get('especialidad'),
            };

            axios.put('/usuario/' + user.id, usuarioData, {
                headers: {
                    Authorization: `${token}`
                }
            })
            .then(function(response) {
                alert(response.data.message);
            })
            .catch(function(error) {
                console.error('Error al editar usuario:', error);
                alert('Error al editar usuario');
            });
        });

        // Botón eliminar usuario
        document.getElementById('eliminarUsuario').addEventListener('click', function() {
            axios.delete('/usuario/' + user.id, {
                headers: {
                    Authorization: `${token}`
                }
            })
            .then(function(response) {
                alert('Usuario eliminado correctamente');
                window.location.href = '/';
            })
            .catch(function(error) {
                console.error('Error al eliminar usuario:', error);
                alert('Error al eliminar usuario');
            });
        });
    })
    .catch(function(error) {
        console.error('Error al obtener los datos del usuario:', error);
        alert('Error al obtener los datos del usuario');
    });
});