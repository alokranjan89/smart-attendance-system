# Backend Dockerfile
# Builds the Node.js/Express API

FROM node:18-alpine

WORKDIR /usr/src/app

# copy package.json and package-lock before other files for caching
COPY package*.json ./

RUN npm install --production

# copy source
COPY . .

# expose whichever port is configured at runtime (default 8000)
EXPOSE 8000

CMD ["npm", "start"]
