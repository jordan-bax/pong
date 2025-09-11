FROM node:22 AS builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY frontend ./
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache openssl
RUN mkdir -p /etc/nginx/certs
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/certs/selfsigned.key -out /etc/nginx/certs/selfsigned.crt -subj "/CN=localhost"

COPY backend/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

