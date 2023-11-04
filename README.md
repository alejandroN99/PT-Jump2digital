# pt-jump2digital

## Descripción

Aplicación de una prueba técnica para participar en Jump2Digital. Proporciona una API para comprar y gestionar "skins" en un juego.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- TypeScript
- Jest
- Bcrypt
- JsonWebToken (JWT)
- Cors
- Dotenv
- Mongoose
- Nodemon

## Instrucciones de Instalación

1. Clona este repositorio desde GitHub:

   ```bash
   git clone https://github.com/alejandroN99/PT-Jump2digital.git
   ```

   Navega hasta el directorio del proyecto:

Navega hasta el directorio del proyecto:

```bash
cd pt-jump2digital
```

Instala las dependencias:

```bash
npm install
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```plaintext
MONGO_DB_CNN="mongodb://127.0.0.1:27017/jump2digital"
PORT="8080"
SECRETKEY_JWT="tu_clave_secreta_para_JWT"


## Instrucciones de Uso

Ejecutar la Aplicación

Para iniciar la aplicación, utiliza el siguiente comando:

```bash
npm start
```

## Uso de la Aplicación

La aplicación se ejecutará en el puerto definido en tu archivo de variables de entorno (por defecto, 8080). Puedes acceder a la API a través de un navegador web o una herramienta como Postman.

## Rutas de la API

- **/user/register**: Registro de usuarios.
- **/user/auth**: Autenticación de usuarios y obtención de token.
- **/skins/available**: Obtener todas las "skins" disponibles.
- **/skins/buy**: Comprar una "skin".
- **/skins/myskins**: Obtener las "skins" del usuario.
- **/skins/color**: Cambiar el color de una "skin" existente.
- **/skins/delete/:id**: Eliminar una "skin" por su ID.
- **/skins/getskin/:id**: Obtener una "skin" por su ID.


Para interactuar con estas rutas, utiliza herramientas como Postman o realiza peticiones HTTP desde tu aplicación.

## Datos Necesarios en las Solicitudes (Requests)

A continuación se describen los datos requeridos para interactuar con las rutas de la API. Tenga en cuenta que un token de autenticación JWT es requerido en todas las rutas.

### `/user/register`

- **Método HTTP:** POST
- **Datos Requeridos:**
  - `name`: Nombre del usuario (cadena de texto).
  - `email`: Correo electrónico del usuario (formato de correo electrónico válido).
  - `password`: Contraseña del usuario (cadena de texto).

### `/user/auth`

- **Método HTTP:** POST
- **Datos Requeridos:**
  - `name`: Nombre del usuario (cadena de texto).
  - `email`: Correo electrónico del usuario (formato de correo electrónico válido).
  - `password`: Contraseña del usuario (cadena de texto).

### `/skins/available`

- **Método HTTP:** GET
- **Datos Requeridos:**
  - `id`: ID de la "skin" a comprar (número entero).
  - Token de autenticación JWT en el encabezado de la solicitud con nombre jw-token.

### `/skins/buy`

- **Método HTTP:** POST
- **Datos Requeridos:**
  - `_id`: ID de la "skin" a comprar (ID válido en formato MongoDB).
  - Token de autenticación JWT en el encabezado de la solicitud con nombre jw-token.

### `/skins/myskins`

- **Método HTTP:** GET
- **Datos Requeridos:**
  - Token de autenticación JWT en el encabezado de la solicitud con nombre jw-token.

### `/skins/color`

- **Método HTTP:** PUT
- **Datos Requeridos:**
  - `color`: Nuevo color de la "skin" (cadena de texto).
  - `name`: Nombre de la "skin" a actualizar (cadena de texto).
  - Token de autenticación JWT en el encabezado de la solicitud con nombre jw-token.

### `/skins/delete/:id`

- **Método HTTP:** DELETE
- **Datos Requeridos:**
  - `id`: ID de la "skin" a eliminar (ID válido en formato MongoDB).
  - Token de autenticación JWT en el encabezado de la solicitud con nombre jw-token.

### `/skins/getskin/:id`

- **Método HTTP:** GET
- **Datos Requeridos:**
  - `id`: ID de la "skin" a obtener (ID válido en formato MongoDB).
  - Token de autenticación JWT en el encabezado de la solicitud con nombre jw-token.

## Ejecución de Pruebas

Puedes ejecutar pruebas unitarias utilizando el siguiente comando:

```bash
npm test
```

Este comando ejecutará las pruebas definidas en la carpeta **tests**.
