FROM node:18
WORKDIR /app
COPY microservices/service ./microservices/service
COPY server/prisma ./server/prisma
COPY server/package.json ./server/package.json
WORKDIR /app/microservices/service
RUN npm install --production
CMD ["node", "index.js"]
