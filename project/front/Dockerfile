FROM node:latest

EXPOSE 8080

WORKDIR /usr/src/app

COPY ./app .

RUN npm install --legacy-peer-deps

CMD ["npm", "run", "start"]
