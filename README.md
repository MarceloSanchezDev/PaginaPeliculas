# Pagina de Peliculas

## **Descripción del Proyecto**
La aplicación es una plataforma que permite a los usuarios explorar, buscar y guardar películas favoritas utilizando la API de TMDb (The Movie Database). Incluye un sistema de autenticación desarrollado con Node.js y JWT (JSON Web Tokens) para gestionar usuarios y sesiones de manera segura.

El frontend está construido con React y estilizado con Bootstrap para garantizar una experiencia visual atractiva y responsiva. Además, se utilizan herramientas modernas como Vite para el desarrollo rápido del frontend y Zod para la validación de datos tanto en el cliente como en el servidor.

---

## **Estructura del Proyecto**

```
paginapeliculas/
├── .env
├── backend/
│   ├── app.js
│   ├── controllers/
│   ├── dist/
│   ├── index.js
│   ├── models/
│   ├── node_modules/
│   ├── package.json
│   ├── routes/
│   ├── schema/
│   ├── utilsBackend/
├── frontend/
│   ├── dist/
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/
│   ├── package.json
│   ├── public/
│   ├── src/
│   ├── vite.config.js
├── node_modules/
├── package.json
├── README.md
```

---

## **Funcionalidades Principales**

### **Frontend:**
- **Página de inicio:** Listado de películas populares.
- **Búsqueda:** Permite buscar películas por título.
- **Favoritos:** Los usuarios autenticados pueden agregar o eliminar películas de su lista de favoritos.
- **Autenticación:** Formulario de inicio de sesión y registro.
- **Detalles de películas:** Información detallada sobre cada película.

### **Backend:**
- **Autenticación de usuarios:**
  - Registro de nuevos usuarios con contraseñas cifradas usando `bcrypt`.
  - Inicio de sesión con generación de tokens JWT.
- **Gestión de favoritos:** CRUD para la lista de favoritos del usuario.
- **Intermediario con TMDb:** Proxy para interactuar con la API de TMDb desde el servidor.

---

## **Detalles Técnicos**

### **Frontend:**
- **Framework:** React
- **Estilo:** Bootstrap y SweetAlert2 para notificaciones.
- **Routing:** `react-router-dom` para la navegación entre páginas.
- **Validación:** Validación de formularios y datos con Zod.

### **Backend:**
- **Framework:** Express.js
- **Base de datos:** SQLite utilizando `@libsql/client` para almacenamiento ligero.
- **Seguridad:** Autenticación con JWT y cifrado de contraseñas con `bcrypt`.
- **Validación de datos:** Zod para validar entradas y salidas.

### **Dependencias comunes:**
- **HTTP Client:** Axios para solicitudes HTTP tanto en frontend como en backend.
- **Gestión de variables de entorno:** dotenv.

---

## **Flujo de Trabajo**

### **Frontend:**
1. El usuario accede a la página principal y visualiza películas populares obtenidas desde TMDb.
2. Puede registrarse o iniciar sesión.
3. Una vez autenticado, puede:
   - Buscar películas por título.
   - Agregar películas a su lista de favoritos.
   - Visualizar la lista de favoritos en su perfil.

### **Backend:**
1. Al registrarse, la contraseña del usuario se cifra antes de almacenarse en la base de datos.
2. En el inicio de sesión, se verifica la contraseña y se genera un token JWT.
3. El backend interactúa con la API de TMDb para obtener datos de películas y los devuelve al cliente.
4. La lista de favoritos se almacena en la base de datos y está asociada al usuario autenticado.

---

## **Ejecución del Proyecto**

### **Requisitos Previos:**
- Node.js v16+ y npm.
- Configuración de las variables de entorno:
  - API_KEY de TMDb.
  - Secretos para JWT.

### **Comandos Principales:**

1. **Instalación de dependencias:**
   ```bash
   npm install
   ```

2. **Ejecución en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilación del Frontend:**
   ```bash
   cd ./frontend && npm run build
   ```

4. **Ejecución del Backend:**
   ```bash
   cd ./backend && npm run dev
   ```

---

## **Mejoras Futuras**

- Implementar soporte para OAuth2 para autenticación con Google o Facebook.
- Agregar la funcionalidad de comentarios y calificaciones en las películas.
- Soporte multilingüe para la interfaz de usuario.
