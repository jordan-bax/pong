# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# COPY pong.html ./

# Install dependencies inside the container
RUN npm install
# RUN npm install express socket.io
# RUN npm install -g typescript http-server
RUN npm install socket.io-client
RUN npm install socket.io
# RUN npm install --save-dev @types/socket.io-client
# Create the TypeScript file

COPY . .

# Compile TypeScript to JavaScript
# RUN tsc pong.ts

RUN npm run build

# Create the HTML file
# RUN open pong.html 
# -a "Google Chrome" --args "--disable-web-security --user-data-dir" --new-window

# Expose port 8080 for the HTTP server
EXPOSE 8080
# EXPOSE 8081

# Serve the HTML file using http-server
# CMD ["http-server", "-p", "8080"]

CMD [ "npm", "run", "start" ]