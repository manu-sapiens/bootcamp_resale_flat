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
