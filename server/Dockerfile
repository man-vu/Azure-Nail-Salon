# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Expose the server port
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]
