# Use Node.js LTS (Long Term Support) version
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy CSV data file and application source
COPY ResaleFlatPricesBasedonApprovalDate19901999.csv .
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "node", "server.js" ]
