FROM node:14.17.4 AS build
COPY . /opt/vue
WORKDIR /opt/vue
RUN npm install --registry https://mirrors.cloud.tencent.com/npm/ && npm run build

FROM nginx:latest
COPY --from=build /opt/vue/dist /opt/vue/dist
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g","daemon off;"]
