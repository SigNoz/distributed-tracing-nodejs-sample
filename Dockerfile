# Base image for Nodejs-16 with Alpine Linux
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install && \
    apk add --no-cache bash

# Bundle app source
COPY . .

# Remove Frontend folder from backend image
RUN rm -rf frontend

# Expose port
EXPOSE 8080 8081 8082

# Entrypoint script
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# Start all services
CMD [ "all" ]
