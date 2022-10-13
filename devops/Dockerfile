FROM node:16.16-alpine3.16
ARG envFile
ARG NPM_AUTH_TOKEN
WORKDIR /usr/app

RUN apk add --update --no-cache 

ENV NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}
COPY . ./
COPY devops/.npmrc_actions /root/.npmrc
RUN rm -rf node_modules/
COPY devops/${envFile} .
RUN mv ${envFile} .env

RUN yarn
RUN yarn build


EXPOSE 3000