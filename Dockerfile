# Use the NGINX image
FROM nginx:alpine

RUN npm install

# Copy the build output to the NGINX html directory
COPY dist/notus-angular /usr/share/nginx/html

# Copy custom NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
