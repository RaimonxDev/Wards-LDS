FROM node:lts-alpine3.10 as node

RUN mkdir /app

COPY package.json package-lock.json /app/

WORKDIR /app

# Instala y construye el Angular App
RUN npm ci
# Copia toda la aplicacion
COPY ./ /app/

RUN npm run build

# Angular app construida, la vamos a hostear un server production, este es Nginx

FROM nginx:1.19.0-alpine

COPY --from=node /app/dist/wardsLDS/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

