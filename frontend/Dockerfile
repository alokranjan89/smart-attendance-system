# Frontend Dockerfile (build & serve using nginx)

# build stage
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# remove default nginx config if needed or leave default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
