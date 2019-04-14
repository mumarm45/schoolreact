FROM node

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json


RUN npm install --silent

RUN npm install react-scripts -g --silent


COPY . /usr/src/app

RUN npm run build




COPY . .

EXPOSE 8088



#FROM nginx:1.13.12-alpine

CMD [ "node", "app" ]