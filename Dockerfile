FROM node:20.19.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 3010
CMD ["npm", "run", "start"]