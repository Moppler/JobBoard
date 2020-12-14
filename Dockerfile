FROM node:14.15.1-alpine

WORKDIR /usr/src/app

RUN apk --no-cache add --virtual builds-deps build-base python

COPY package*.json ./

RUN npm install --quiet

RUN npm rebuild bcrypt --build-from-source

COPY . .

CMD [ "npm", "start" ]