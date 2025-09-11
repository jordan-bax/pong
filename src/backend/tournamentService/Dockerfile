FROM node:22
RUN npm install -g npm@latest

WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig.json ./
RUN npm install

RUN mkdir db
COPY ./schemas/ ./schemas/
COPY ./src/ ./src/

RUN npm run build

EXPOSE 3003
ENV ADDRESS=0.0.0.0 PORT=3003

CMD [ "npm", "run", "start" ]
