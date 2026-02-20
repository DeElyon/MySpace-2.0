FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY package.json tsconfig.json nest-cli.json ./
COPY prisma ./prisma/

RUN pnpm install

COPY src ./src

RUN pnpm build

EXPOSE 3001

CMD ["pnpm", "start"]
