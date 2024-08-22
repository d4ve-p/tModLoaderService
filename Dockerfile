# Base image for Node.js environment
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy entire directory
COPY . .

# Install node dependencies
RUN npm install

RUN apk update && apk add --no-cache curl && apk add icu-libs && apk add bash

# Install tModLoader
RUN mkdir tModLoader && \
  curl -L https://github.com/tModLoader/tModLoader/releases/download/v2024.06.3.1/tModLoader.zip -o tModLoader/tModLoader.zip && \
  cd tModLoader && \
  unzip tModLoader.zip && \
  rm tModLoader.zip

# Setup user permission
RUN chmod +x "/app/tModLoader/start-tModLoaderServer.sh"

# Start development server
CMD [ "npm", "run", "dev" ]