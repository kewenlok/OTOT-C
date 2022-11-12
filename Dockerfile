FROM node:16-slim
COPY package*.json ./
RUN npm i
COPY config/ config/
COPY models/ models/
COPY middleware/ middleware/
COPY server.js ./
EXPOSE 8081/tcp
CMD ["npm", "start"]