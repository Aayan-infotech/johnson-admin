k# Stage 1: Build the Vite application
FROM node:20.11.1 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (allow legacy deps if needed)
RUN npm install --legacy-peer-deps

# Copy the rest of the app source code
COPY . .

# Build the app using Vite
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:1.25-alpine

# Copy the build output to Nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Replace the default Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose application port
EXPOSE 2564

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

