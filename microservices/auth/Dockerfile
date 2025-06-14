FROM node:18
WORKDIR /app
COPY microservices/auth ./microservices/auth
COPY server/prisma ./server/prisma
WORKDIR /app/microservices/auth
RUN npm install --production
CMD ["node", "index.js"]
