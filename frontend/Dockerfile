FROM node:19-alpine3.16
WORKDIR /frontend
COPY package*.json /frontend
RUN npm install
COPY . /frontend
EXPOSE 3001
CMD [ "npm", "run", "dev" ]
