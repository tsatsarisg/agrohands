FROM node:23

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5001

RUN npm run build