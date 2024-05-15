FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install npm@latest

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
