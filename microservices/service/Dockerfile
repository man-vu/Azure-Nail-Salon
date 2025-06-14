FROM node:18
WORKDIR /app
COPY microservices/service ./microservices/service
COPY server/prisma ./server/prisma
WORKDIR /app/microservices/service
RUN npm install --production
CMD ["node", "index.js"]
