FROM node:18.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=5000
ENV DATABASE_URL=mysql://ppnksbvd3f2jo:pscale_pw_uMltsGF/db_name?sslaccept=strict&sslmode=/etc/ssl/cert.pem&connect_timeout=60
ENV MYSQL_ATTR_SSL_CA=/etc/ssl/cert.pem
RUN npm run prisma:generate
RUN chmod +x './entrypoint.sh'
ENTRYPOINT ["./entrypoint.sh"]