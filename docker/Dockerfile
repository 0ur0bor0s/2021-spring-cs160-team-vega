FROM node:14


WORKDIR /usr/src/vega-project

#Cypress
COPY ./src/package*.json ./
RUN npm install

#frontend
COPY ./src/my-app/package*.json ./my-app/
RUN cd ./my-app && npm install && npm install --save-dev && npm install --save graphql

#backend
COPY ./src/server/package*.json ./server/
RUN cd ./server/ && npm install nodemon -g && npm install -g ts-node && npm install --save-dev && npm install

#Copy start script
COPY ./docker/start.sh ./

#Copy remaining files
COPY ./src/my-app/ ./my-app/
COPY ./src/server/ ./server/

EXPOSE 3000
EXPOSE 4000
EXPOSE 3306

CMD ./start.sh

