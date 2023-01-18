FROM node:18.11.0-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app/consumer

RUN  mkdir -p /home/node/app/consumer

COPY package.json .

RUN npm install 

COPY . .
