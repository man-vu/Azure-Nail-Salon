FROM node:18
WORKDIR /app
COPY microservices/gallery ./microservices/gallery
COPY server/prisma ./server/prisma
WORKDIR /app/microservices/gallery
RUN npm install --production
CMD ["node", "index.js"]
