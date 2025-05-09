# Stage 1: Build the Vite app
FROM node:20 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built files to Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port your app will run on
EXPOSE 2564

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

