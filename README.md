# eCommerce React JS + Strapi CMS

 ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
 ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)


![Project GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTcxdmFhcTZic3g5NHdhcXdvNTJtNWxjNGZxc3NlYmQ3OTYxc29rdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/utZUVb3TfXrAgco32D/giphy.gif)




## Getting started 🚀


### Prerequisites 📋


| Technology   | Version    |
|------------- |------------|
| Vite         | ^5.2.0     |
| Node.js      | ^18.7.1    |
| Npm          | ^9.8.0     |
| Git          | ^2.37.x    |


### Installation 🔧

1. **Create a folder on your computer for the project**
   ```bash
      mkdir tu-carpeta
      cd tu-carpeta
   ```

2. **Clone frontend / backend repository**
   ```bash
      git clone "https://github.com/javub25/shopping-frontend.git"
      git clone "https://github.com/javub25/shopping-backend.git"
   ```

#### Frontend

3. **Install dependencies**
   ```bash
      cd shopping-frontend
      npm install
   ```
4. **Setting environment variables**

   - Create a **.env.development** file in the root of the project.
   - Add the following backend variables:

   ```bash
   VITE_STRAPI_API_URL=your_strapi_instance
   ```  

#### Backend

5. **Install dependencies**
   ```bash
      cd shopping-backend
      npm install
   ```  


6. **Setting environment variables to connect to the database**

   - Create a file named **.env** in the root of the project.
   - Add the following variables:
   

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


7. **Download database backup:**

    [Backup DB Testing](https://drive.google.com/file/d/1RiYDoiIaiO04BhyFlbY2FFITMVj0C7Og/view)
  

8. **Import the database**
    ```bash 
      npm run strapi import -- -f backup_file
      #or
      yarn strapi import -f backup_file
    ```

9. **Start Strapi application**
   ```bash
      npm run develop  
      # or
      yarn develop
   ```

10. **Start frontend alongside backend**
    ```bash
     cd shopping-frontend 
     npm run dev
    ```
  
### Built with 🛠️

React - Web library for interface creation  

Strapi - CMS for backend management  

Vite - Web packager  

Tailwind CSS - CSS Framework  


### Additional notes

These tools will be installed automatically through `npm install`:

| Technology            | Version    | Function                                  |
|-----------------------|------------|------------------------------------------ |
| Wouter                | ^3.1.2     | Routing library                           |
| React Toastify        | ^10.0.5    | Notification library                      |
| React Initials Avatar | ^1.1.2     | Avatar creation library                   |
| DaisyUI               | ^4.11.1    | Component library                         |
| Axios                 | ^1.6.8     | Library for making HTTP requests          |



### Wiki 📖

 [Wouter](https://github.com/molefrog/wouter)   

 [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)  

 [React Initials Avatar](https://www.npmjs.com/package/react-initials-avatar)  

 [DaisyUI](https://daisyui.com/components/)  

 [Data import - STRAPI](https://docs.strapi.io/dev-docs/data-management/import)  

 [Data export - STRAPI](https://docs.strapi.io/dev-docs/data-management/export)

 [Filters - STRAPI](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering)

