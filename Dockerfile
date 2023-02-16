FROM node:18.13.0 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:18.13.0 as deployment
WORKDIR /usr/src/app
COPY ./package.json .
COPY ./package-lock.json .
COPY ./entrypoint.sh .
COPY --from=builder /usr/src/app/build /usr/src/app
RUN npm ci --only=production --ignore-scripts
RUN chmod +x './entrypoint.sh'
ENTRYPOINT ["./entrypoint.sh"]