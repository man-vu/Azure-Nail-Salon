FROM node:18
WORKDIR /app
COPY microservices/designer ./microservices/designer
COPY server/prisma ./server/prisma
COPY server/package.json ./server/package.json
RUN npm install --production --prefix server
WORKDIR /app/microservices/designer
RUN npm install --production
CMD ["node", "index.js"]
