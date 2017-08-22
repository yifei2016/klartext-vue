FROM node:6.11.2-alpine
RUN apk add --no-cache git

ADD . /app
WORKDIR /app

RUN yarn

EXPOSE 5000
CMD ["npm","run","dev"]
