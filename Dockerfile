# Step 1: Build the Angular app
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Step 2: Serve the Angular app using NGINX
FROM nginx:alpine

# Copy the build output to the NGINX html directory
COPY --from=build /app/dist/notus-angular /usr/share/nginx/html

# Copy custom NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
