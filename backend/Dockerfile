FROM node:19-alpine3.16
WORKDIR /app
COPY package*.json /app
RUN npm install --dev
COPY . /app
EXPOSE 3000
CMD [ "node", "run", "dev" ]
