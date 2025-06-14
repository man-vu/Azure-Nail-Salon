FROM node:18
WORKDIR /app
COPY microservices/review ./microservices/review
COPY server/prisma ./server/prisma
COPY server/package.json ./server/package.json
WORKDIR /app/microservices/review
RUN npm install --production
CMD ["node", "index.js"]
