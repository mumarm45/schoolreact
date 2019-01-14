FROM node:9.11.1 as build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json


RUN npm install --silent

RUN npm install react-scripts -g --silent

COPY . /usr/src/app

RUN npm run build


FROM nginx:1.13.12-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
