FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy package files
COPY package.json tsconfig.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY src ./src

# Build
RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]
