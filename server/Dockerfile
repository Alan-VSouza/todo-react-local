FROM node:16

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server/ .

EXPOSE 3001

CMD ["node", "server.js"]
