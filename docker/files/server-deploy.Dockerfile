FROM node:16.14.2
ENV TZ="America/Montreal"
EXPOSE 3000

WORKDIR /home/server
COPY ./server/package*.json ./

# Installation
RUN npm ci

# Copie du projet
COPY ../ /home/

# Compilation
RUN npm run build

CMD ["node", "out/server/app/index.js"]
