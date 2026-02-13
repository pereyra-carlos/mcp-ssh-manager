FROM node:20-bookworm-slim

WORKDIR /app

# Runtime tools used by several SSH MCP features.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       openssh-client \
       rsync \
       sshpass \
       ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

ENV NODE_ENV=production

CMD ["node", "src/index.js"]

