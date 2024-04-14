FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install --unsafe-perm

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]