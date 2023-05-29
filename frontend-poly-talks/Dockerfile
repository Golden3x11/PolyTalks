FROM node:18.15.0-alpine

RUN mkdir -p /app/client
WORKDIR /app/client
COPY package.json /app/client
COPY package-lock.json /app/client

RUN npm install

COPY . /app/client

CMD ["npm", "start"]
