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

La vista principal del proyecto, una lista de las personas ya registradas y dos enlaces para Iniciar Sesión, si ya el usuario esta registrado, y el enlace de Registro, para que el usuario pueda registrarse. La vista de registro, que nos muestra un formulario, todos los datos son obligatorios. 

| Vista Principal | Registro |
| --- | --- |
| ![principal](/public/imgReadme/)| ![registro](/public/imgReadme/) |


Al registrarse existosamente, se nos indicara un mensaje de alerta de Registro exitoso, podemos entonces dirigirnos a la página de Iniciar Sesión.

| Registro Exitoso | Página Login |
| --- | --- |
| ![registro_exitoso](/public/imgReadme/)| ![login](/public/imgReadme/) |





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

6. Después debes levantar el servidor (index.js) con el siguiente comando en tu consola
```
npm start
```

Este te dará el enlace para que puedas ingresar directamente al localhost
```
http://localhost:3001
```

7. En un principio la base de datos esta vacía, así que antes de probar el proyecto, se debe asegurar de registrar algunos usuarios. 


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
