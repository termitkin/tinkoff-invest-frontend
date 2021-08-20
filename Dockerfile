FROM node:14-alpine

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn global add serve
RUN npm run build

CMD ["serve", "-s", "build"]
