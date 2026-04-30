FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/ ./packages/

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the application
RUN npm run build --workspace=api

EXPOSE 3001

CMD ["npm", "run", "dev", "--workspace=api"]
