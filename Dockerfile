FROM nginx:alpine

RUN npm install --npm generate

# Copia la carpeta construida al directorio HTML de NGINX
COPY dist/notus-angular/* /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]