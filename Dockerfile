FROM node:12
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

ENV PGUSER=zacharymansell
# ENV PGHOST=161.35.97.179
ENV PGHOST=localhost
ENV PGDATABASE=mvp
ENV PGPASSWORD=zacharymansell
ENV PGPORT=5432
ENV PORT=3000

CMD ["npm", "run", "start"]