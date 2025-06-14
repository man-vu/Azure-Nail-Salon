FROM node:18
WORKDIR /app
COPY microservices/transaction ./microservices/transaction
COPY server/prisma ./server/prisma
WORKDIR /app/microservices/transaction
RUN npm install --production
CMD ["node", "index.js"]
