# Base image for Node.js environment
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy entire directory
COPY . .

# Install node dependencies
RUN npm install

RUN apk update && apk add --no-cache curl && apk add icu-libs && apk add bash

# Setup user permission
RUN chmod +x "/app/tModLoader/start-tModLoaderServer.sh"

# Start development server
CMD [ "npm", "run", "dev" ]