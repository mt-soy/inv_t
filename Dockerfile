FROM node:20-alpine3.19

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY --chmod=node:node package*.json ./
RUN npm install

COPY --chmod=node:node . .
