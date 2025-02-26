const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store data in memory for quick access
let hdbData = [];

// Load CSV data when server starts
fs.createReadStream('ResaleFlatPricesBasedonApprovalDate19901999.csv')
  .pipe(csv())
  .on('data', (row) => {
    hdbData.push(row);
  })
  .on('end', () => {
    console.log('CSV data loaded successfully');
  });

// GET all data with pagination
app.get('/api/resale', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {
    total: hdbData.length,
    page: page,
    limit: limit,
    data: hdbData.slice(startIndex, endIndex)
  };

  res.json(results);
});

// GET data by town
app.get('/api/resale/town/:town', (req, res) => {
  const town = req.params.town.toUpperCase();
  const filteredData = hdbData.filter(record => 
    record.town && record.town.toUpperCase() === town
  );
  res.json(filteredData);
});

// GET data by flat type
app.get('/api/resale/flat-type/:type', (req, res) => {
  const flatType = req.params.type.toUpperCase();
  const filteredData = hdbData.filter(record => 
    record.flat_type && record.flat_type.toUpperCase() === flatType
  );
  res.json(filteredData);
});

// GET average price by town
app.get('/api/resale/stats/town', (req, res) => {
  const stats = hdbData.reduce((acc, record) => {
    const town = record.town;
    if (!acc[town]) {
      acc[town] = {
        count: 0,
        total: 0,
        average: 0
      };
    }
    acc[town].count++;
    acc[town].total += parseFloat(record.resale_price);
    acc[town].average = acc[town].total / acc[town].count;
    return acc;
  }, {});
  res.json(stats);
});

// GET data by town and flat type with statistics
app.get('/api/resale/search', (req, res) => {
  const town = req.query.town ? req.query.town.toUpperCase() : null;
  const flatType = req.query.flatType ? req.query.flatType.toUpperCase() : null;

  if (!town || !flatType) {
    return res.status(400).json({ error: 'Both town and flat type are required' });
  }

  const filteredData = hdbData.filter(record => 
    record.town && 
    record.flat_type && 
    record.town.toUpperCase() === town && 
    record.flat_type.toUpperCase() === flatType
  );

  if (filteredData.length === 0) {
    return res.json({
      results: [],
      stats: null,
      message: 'No matching records found'
    });
  }

  // Calculate statistics
  const prices = filteredData.map(record => parseFloat(record.resale_price));
  const stats = {
    count: filteredData.length,
    averagePrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    medianPrice: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)]
  };

  res.json({
    results: filteredData,
    stats: stats
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
