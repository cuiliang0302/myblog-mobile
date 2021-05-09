FROM node:14.16.0 AS build
COPY . /opt/myblog_mobile
RUN rm -rf /opt/myblog_mobile/src/api/request.js && mv /opt/myblog_mobile/src/api/request_prod.js /opt/myblog_mobile/src/api/request.js
WORKDIR /opt/myblog_mobile
RUN npm install && npm run build

FROM nginx:1.18.0
COPY --from=build /opt/myblog_mobile/dist /opt/myblog_mobile/dist
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g","daemon off;"]
