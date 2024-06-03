# Desafío Prueba - Skate Park
Este desafío es parte del curso de Desafio Latam, Desarrollo de aplicaciones Full Stack Js, en el cual validaremos nuestros conocimientos del modulo 8 y del curso en su totalidad.


# Descripción del desafío
La Municipalidad de Santiago, ha organizado una competencia de Skate para impulsar el nivel deportivo de los jóvenes que desean representar a Chile en los X Games del próximo año, y han iniciado con la gestión para desarrollar la plataforma web en la que los participantes se podrán registrar y revisar el estado de su solicitud.

● Crear una API REST con el Framework Express.
● Servir contenido dinámico con express-handlebars.
● Ofrecer la funcionalidad Upload File con express-fileupload.
● Implementar seguridad y restricción de recursos o contenido con JWT.



# Visuales

A continuación se explica el funcionamiento del proyecto, desde el registro, hasta la edición y eliminación del usuario.

En la vista principal del proyecto, encontramos lista de las personas ya registradas (si existe un registro) y dos enlaces: para Iniciar Sesión, si ya el usuario esta registrado, y el enlace de Registro, para que el usuario pueda registrarse. La vista de registro, nos muestra un formulario a rellenar con los datos del participante, todos los datos son obligatorios. 

| Vista Principal | Registro |
| --- | --- |
| ![principal](/public/imgReadme/vistaprincipal.png)| ![registro](/public/imgReadme/registro.png) |


Al registrarse existosamente, se nos indicara un mensaje de alerta de Registro exitoso, podemos entonces dirigirnos a la página de Iniciar Sesión, donde nos pedirán el email y contraseña.

| Registro Exitoso | Página Login |
| --- | --- |
| ![registro_exitoso](/public/imgReadme/registroexitoso.png)| ![login](/public/imgReadme/paginalogin.png) |


Al conectarnos (login) exitosamente, nuevamente se nos enviara un mensaje de exito y automáticamente nos llevara a la página de datos del usuario. En esa página, el participante puede modificar y/o eliminar su propia cuenta del registro.

| Conexión Exitosa | Página del usuario |
| --- | --- |
| ![conexion_exitoso](/public/imgReadme/loginexitoso.png)| ![data_usuario](/public/imgReadme/datosUsuario.png) |

Al modificar el usuario y seleccionar actualizar, se nos enviará una alerta para avisar ue se ha modificado correctamente los datos. Y al eliminar el usuario, con su botón respectivo, también nos emitirá una alerta que el usuario fue eliminado correctamente. Esto ocurrira si el proceso no tiene errores.

Cuando se actualiza usuario, permanece en la página actual, pero al eliminar a usuario, nos redirige a la página de inicio. 

| Actualización Exitosa | Eliminación de usuario | Página Inicio |
| --- | --- | --- |
| ![actualizacion_exitosa](/public/imgReadme/updexitoso.png)| ![eliminacion](/public/imgReadme/deletexitoso.png) | ![inicio](/public/imgReadme/paginainicio.png) |

Finalmente, existe una página más localhost:3001/admin, a la cual puedes acceder. En esta página puedes cambiar el estado de los usuarios gracias a los checklist.

| Página Admin | Check List activado | Estado cambiado |
| --- | --- | --- |
| ![admin_1](/public/imgReadme/vistaAdmin.png)| ![admin_2](/public/imgReadme/checkcambiado.png) | ![estado_cambiado](/public/imgReadme/estadocambiado.png) |

Cuando se selecciona un ckecklist, aparece una alerta, para avisar al usuario que el cambio fue realizado. Este cambio se ve reflejado en la página principal, cuando el estado del participante pasa de "En revisión" a "Aprobado". 


## Empezando 🚀

Estas instrucciones te guiarán para obtener una copia de este proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

- Sistema Operativo: puedes usar Ubuntu o Windows 10 o superior.
- Se trabajo con Javascript.
- Se utilizo express, axios, fs, jsonwebtoken.
- Para este proyecto se utiliza también nodemon.

### Instalación 🔧

1. Para utilizar este proyecto debes clonar este repositorio en tu máquina, utilizando git.

```
git clone 
```

2. Una vez allí puedes abrir el proyecto donde te sea más comodo. 
   
3. Antes de iniciar, debes crear la base de datos, dichas instrucciones puedes encontrarlas en el archivo skateBD.sql.
   
4. volviendo al proyecto debes realizar la instalación de las dependencias, con el siguiente comando.

```
npm install
```

5. En el archivo dbConfig.js, recuerda colocar tus datos de acceso a tu base de datos: usuario y contraseña.
   ```
    const name = "";
    const pass = "";
   ```

6. Después debes levantar el servidor (index.js) con el siguiente comando en tu consola.
   
   ```
   npm start
   ```

   Este te dará el enlace para que puedas ingresar directamente al localhost
   ```
   http://localhost:3001
   ```

En un principio la base de datos esta vacía, así que antes de probar el proyecto, se debe asegurar de registrar algunos usuarios. 


## Soporte

Si tienes algún problema o sugerencia, por favor abre un problema [aquí]().

## Versionado  📌

Usamos [Git](https://git-scm.com) para el versionado.

## Expresiones de Gratitud 🎁

Si encontraste cualquier valor en este proyecto o quieres contribuir, aquí está lo que puedes hacer:

- Comparte este proyecto con otros
- Invítanos un café ☕
- Inicia un nuevo problema o contribuye con un PR
- Muestra tu agradecimiento diciendo gracias en un nuevo problema.

---

⌨️ con ❤️ por [Joselyn Gonzalez](https://github.com/jesbell) 😊
