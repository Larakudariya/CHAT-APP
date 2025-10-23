# Use official Node.js image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose backend port
EXPOSE 5002

# Start the app using package.json start script
CMD ["npm", "start"]

