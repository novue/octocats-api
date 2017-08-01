const fs = require('fs');
const cors = require('cors');
const express = require('express');

const app = express();

const PORT = process.env.NODE_ENV === 'production' ?  80 : 3000;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const OCTOCATS = JSON.parse(fs.readFileSync('./octocats.json').toString());

app.use(cors());

app.get('/api/octocats', function(req, res) {
  let page = parseInt(req.query.page) || DEFAULT_PAGE;
  let size = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
  res.json({
    data: OCTOCATS.slice((page - 1) * size, page * size),
    pagination: {
      pageSize: size,
      totalItems: OCTOCATS.length,
      currentPage: page,
      totalPages: Math.ceil(OCTOCATS.length / size),
      hasNextPage: page * size < OCTOCATS.length
    }
  });
});

app.get('*', function(req, res) {
  res.sendStatus(404);
});

app.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}`);
});


