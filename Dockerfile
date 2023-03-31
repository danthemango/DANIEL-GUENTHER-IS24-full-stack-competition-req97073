FROM node:19-alpine3.16
WORKDIR /backend
COPY ./backend/package*.json /backend
RUN npm install
WORKDIR /frontend
COPY ./frontend/package*.json /frontend
RUN npm install
COPY ./frontend /frontend
RUN npm run build
COPY ./backend /backend
WORKDIR /frontend/dist
RUN mv /frontend/dist /backend
WORKDIR /backend
EXPOSE 3000
CMD [ "npm", "start" ]
