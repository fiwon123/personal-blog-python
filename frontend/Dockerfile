
FROM node:20.19-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent || npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
