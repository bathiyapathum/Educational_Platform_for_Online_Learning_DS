FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install npm@latest

RUN npm install

RUN npm install prisma

RUN npm install @prisma/client

COPY . .

RUN npx prisma generate

EXPOSE 3004

CMD ["npm", "start"]
