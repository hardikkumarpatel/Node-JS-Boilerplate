FROM node:20.11.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]