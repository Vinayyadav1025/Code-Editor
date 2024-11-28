# Use Node.js base image
FROM node:16-slim

# Install Python and dependencies for running Python scripts
RUN apt-get update && apt-get install -y python3 python3-pip python3-dev && apt-get clean

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install Node.js dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port on which the server runs
EXPOSE 5000

# Run the Node.js server
CMD ["node", "server.js"]
