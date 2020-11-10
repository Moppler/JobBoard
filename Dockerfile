FROM node:12.18.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

CMD [ "npm", "start" ]