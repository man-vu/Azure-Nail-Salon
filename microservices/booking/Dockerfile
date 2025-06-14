FROM node:18
WORKDIR /app
COPY microservices/booking ./microservices/booking
COPY server/prisma ./server/prisma
COPY server/package.json ./server/package.json
WORKDIR /app/microservices/booking
RUN npm install --production
CMD ["node", "index.js"]
