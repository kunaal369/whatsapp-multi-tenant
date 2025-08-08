# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (prod and dev both)
RUN npm install

# Copy source code
COPY . .

# Build TypeScript into JavaScript
RUN npm run build

# Expose backend port
EXPOSE 8000

# Start the server using compiled JS
CMD ["node", "dist/server.js"]
