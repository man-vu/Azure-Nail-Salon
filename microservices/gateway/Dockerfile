FROM node:18
WORKDIR /app
COPY microservices/gateway ./microservices/gateway
WORKDIR /app/microservices/gateway
RUN npm install --production
CMD ["node", "index.js"]
