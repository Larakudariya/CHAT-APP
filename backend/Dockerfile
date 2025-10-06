# # Use Node.js LTS version
# FROM node:18

# # Set working directory inside container
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all files
# COPY . .

# # Expose backend port
# EXPOSE 5002

# # Correct entry file set karo
# CMD ["node", "src/index.js"]


# Use Node.js LTS version
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5002

# Start the backend server
CMD ["node", "src/index.js"]
