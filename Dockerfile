FROM node:10

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production 

COPY . .

ENV PORT 8000
ENV NODE_ENV production

USER node

EXPOSE 8000

CMD ["node", "index.js"]
