# Inspiré de https://dzone.com/articles/how-to-dockerize-angular-app

#Stage 1
FROM node:16.14.2 as build
ENV TZ="America/Montreal"
EXPOSE 80/tcp

WORKDIR /home/client
COPY ./client/package*.json ./

# Installation
RUN npm ci --cache .npm --prefer-offline

# Copie du projet
COPY ../ /home/

# Compilation
RUN npm run build --prod


#Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build /home/client/dist/client /usr/share/nginx/html
