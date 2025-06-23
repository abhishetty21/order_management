# Use Node.js for building
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy and install frontend dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy rest of the app and build
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine

# Copy built app
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose frontend port
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]