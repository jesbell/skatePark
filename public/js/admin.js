function actualizarEstado(id, estado){
    axios.put(`/skaters/${id}`, { estado: estado })
    .then(function(response) {
        alert(response.data.message);
    })
    .catch(function(error) {
        console.error('Error al actualizar estado:', error);
        alert('Error al actualizar estado');
    });
}