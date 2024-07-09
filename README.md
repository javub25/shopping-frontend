# eCommerce React JS + Strapi CMS

 ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
 ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)


![Project GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTcxdmFhcTZic3g5NHdhcXdvNTJtNWxjNGZxc3NlYmQ3OTYxc29rdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/utZUVb3TfXrAgco32D/giphy.gif)




## Comenzando 🚀


### Pre-requisitos 📋


| Tecnología   | Versión    |
|------------- |------------|
| Vite         | ^5.2.0     |
| Node.js      | ^18.7.1    |
| Npm          | ^9.8.0     |
| Git          | ^2.37.x    |


### Instalación 🔧

1. **Crear una carpeta en tu equipo para el proyecto**
   ```bash
      mkdir tu-carpeta
      cd tu-carpeta
   ```

2. **Clonar el repositorio del frontend / backend**
   ```bash
      git clone "https://github.com/javub25/shopping-frontend.git"
      git clone "https://github.com/javub25/shopping-backend.git"
   ```

#### Frontend

3. **Instalar dependencias**
   ```bash
      cd shopping-frontend
      npm install
   ```
4. **Configurar variables de entorno**

   - Crear un archivo **.env.development** en la raíz del proyecto.
   - Añadir las siguientes variables del backend:

   ```bash
   VITE_STRAPI_API_URL=your_strapi_instance
   ```  

#### Backend

5. **Instalar dependencias**
   ```bash
      cd shopping-backend
      npm install
   ```  


6. **Configurar variables de entorno para conectarse a la base de datos**

   - Crea un archivo llamado **.env** en la raíz del proyecto.
   - Añadir las siguientes variables:
   

   ```bash
      HOST=strapi_instance
      PORT=strapi_port
      APP_KEYS=tobemodified
      API_TOKEN_SALT=tobemodified
      ADMIN_JWT_SECRET=tobemodified
      TRANSFER_TOKEN_SALT=tobemodified

      # Database
      DATABASE_CLIENT=#'sqlite', 'postgresql', etc...
      DATABASE_FILENAME=tobemodified
      JWT_SECRET=tobemodified
   ```  


7. **Descargar backup de la base de datos:**

    [Backup DB Testing](https://drive.google.com/file/d/1RiYDoiIaiO04BhyFlbY2FFITMVj0C7Og/view)
  

8. **Importa la base de datos**
    ```bash 
      npm run strapi import -- -f backup_file
      #or
      yarn strapi import -f backup_file
    ```

9. **Iniciar aplicación de Strapi**
   ```bash
      npm run develop  
      # or
      yarn develop
   ```

10. **Iniciar frontend junto al backend**
    ```bash
     cd shopping-frontend 
     npm run dev
    ```
  
### Construido con 🛠️

React - Libreria web para la creación de interfaz  

Strapi - CMS para la gestión del backend  

Vite - Empaquetador web  

Tailwind CSS - Framework CSS  


### Notas addicionales

Estas herramientas serán instaladas automáticamente a través de `npm install`:

| Tecnología            | Versión    | Funcionamento                             |
|-----------------------|------------|------------------------------------------ |
| Wouter                | ^3.1.2     | Libreria de routing                       |
| React Toastify        | ^10.0.5    | Libreria de notificaciones                |
| React Initials Avatar | ^1.1.2     | Libreria de creación de avatares          |
| DaisyUI               | ^4.11.1    | Libreria de componentes                   |
| Axios                 | ^1.6.8     | Libreria para realizar peticiones HTTP    |



### Wiki 📖

 [Wouter](https://github.com/molefrog/wouter)   

 [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)  

 [React Initials Avatar](https://www.npmjs.com/package/react-initials-avatar)  

 [DaisyUI](https://daisyui.com/components/)  

 [Data import - STRAPI](https://docs.strapi.io/dev-docs/data-management/import)  

 [Data export - STRAPI](https://docs.strapi.io/dev-docs/data-management/export)

 [Filters - STRAPI](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering)

