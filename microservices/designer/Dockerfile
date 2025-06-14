FROM node:18
WORKDIR /app
COPY microservices/designer ./microservices/designer
COPY server/prisma ./server/prisma
WORKDIR /app/microservices/designer
RUN npm install --production
CMD ["node", "index.js"]
