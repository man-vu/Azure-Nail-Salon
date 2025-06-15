FROM node:18
WORKDIR /app
COPY microservices/gateway ./microservices/gateway
WORKDIR /app/microservices/gateway
COPY .env.production .env
RUN npm install --production
CMD ["node", "index.js"]
