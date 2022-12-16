
FROM node:18.11.0-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app/

RUN  mkdir -p /home/node/app/

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build