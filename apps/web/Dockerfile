FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/ ./packages/

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--workspace=@repo/web"]
