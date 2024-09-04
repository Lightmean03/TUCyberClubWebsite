FROM node:20.17-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY package.json /app
# --verbose fixes bug -- https://github.com/npm/cli/issues/4028
RUN npm install --force --verbose

# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
