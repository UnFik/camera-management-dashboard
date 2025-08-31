FROM oven/bun:latest as build

WORKDIR /app

COPY package.json bun.lock bunfig.toml ./

COPY apps/web/package.json ./apps/web/

RUN bun install

COPY . .

RUN bun run --filter web build

FROM nginx:alpine

ARG PORT=81

EXPOSE ${PORT}
EXPOSE 443

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]