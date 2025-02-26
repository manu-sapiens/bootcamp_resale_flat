# HDB Resale Price Explorer (1990-1999)

A web application that allows users to explore and analyze HDB resale flat prices in Singapore from 1990 to 1999.

## Features

- Browse all resale transactions with pagination
- Search by town name
- Search by flat type
- Market comparison tool:
  - Compare prices for specific town and flat type combinations
  - View detailed statistics including:
    - Average price
    - Minimum price
    - Maximum price
    - Median price
    - Number of transactions

## Tech Stack

- Backend: Node.js with Express
- Frontend: Vanilla JavaScript, HTML, CSS
- Data: CSV file processing with csv-parser

## Prerequisites

- Node.js (v12 or higher)
- npm

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Open your browser and visit: `http://localhost:3000`

## Docker Support

### Building the Docker Image

```bash
# Build the image
docker build -t hdb-resale-api .

# Run the container
docker run -p 3000:3000 hdb-resale-api
```

### Using Docker Hub

```bash
# Tag your image
docker tag hdb-resale-api manusapiens/hdb-resale-api:latest

# Login to Docker Hub
docker login

# Push the image
docker push manusapiens/hdb-resale-api:latest
```

### Pulling and Running from Docker Hub

```bash
# Pull the image
docker pull manusapiens/hdb-resale-api:latest

# Run the container
docker run -p 3000:3000 manusapiens/hdb-resale-api:latest
```

### Using Docker Compose

1. Make sure you have docker-compose installed
2. Update the `docker-compose.yml` file with your Docker Hub username
3. Run the application:

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

The docker-compose configuration includes:
- Automatic container restart
- Health checks
- Volume mounting for the CSV file
- Network isolation
- Production environment setting

## Data Source

The data used in this application is from data.gov.sg:
"Resale Flat Prices (Based on Approval Date), 1990-1999" by the Housing & Development Board (HDB).

## API Endpoints

- `GET /api/resale?page=1&limit=10`: Get paginated resale transactions
- `GET /api/resale/town/:town`: Get transactions by town
- `GET /api/resale/flat-type/:type`: Get transactions by flat type
- `GET /api/resale/search?town=TOWNNAME&flatType=FLATTYPE`: Get detailed market analysis for specific town and flat type
- `GET /api/resale/stats/town`: Get average prices by town

## License

MIT
