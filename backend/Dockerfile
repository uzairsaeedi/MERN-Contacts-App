# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy .env into the container
COPY .env .env

EXPOSE 8080

CMD ["npm", "start"]
