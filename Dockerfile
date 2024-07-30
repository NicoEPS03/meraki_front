# Etapa 1: Construcción de la aplicación
FROM node:14 AS build

WORKDIR /app

# Copia los archivos de configuración de npm
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Ejecuta el script de generación
RUN npm run generate

# Copia la carpeta construida al directorio HTML de NGINX
COPY dist/notus-angular/* /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]