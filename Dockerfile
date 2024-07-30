# Etapa 1: Construcción de la aplicación
FROM node:14 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias de npm
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:alpine

# Copia la carpeta construida desde la etapa anterior
COPY --from=build /app/dist/notus-angular /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
