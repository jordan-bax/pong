FROM node:22
RUN npm install -g npm@latest

WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig.json ./
RUN npm install

RUN mkdir db
COPY ./src/ ./src/
COPY ./types/ ./types/

RUN npm run build

EXPOSE 3006
ENV ADDRESS=0.0.0.0 PORT=3006

CMD [ "npm", "run", "start" ]
