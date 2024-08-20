# Base image for Node.js environment
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy entire directory
COPY . .

# Install node dependencies
RUN npm install

# Install tModLoader
RUN mkdir tModLoader && \
  curl -L https://github.com/tModLoader/tModLoader/releases/download/v2024.06.3.1/tModLoader.zip -o tModLoader/tModLoader.zip && \
  unzip tModLoader/tModLoader.zip && \
  rm tModLoader/tModLoader.zip

# Start development server
CMD [ "npm", "run", "dev" ]