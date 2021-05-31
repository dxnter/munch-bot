FROM alpine:latest

WORKDIR /usr/src/munch-bot
COPY package.json ./

RUN apk add --update \
    && apk add --no-cache nodejs-current nodejs-npm \
    && apk add --no-cache --virtual .build git curl build-base g++ \
    && npm install \
    && apk del .build

COPY . .

CMD ["npm", "start"]
