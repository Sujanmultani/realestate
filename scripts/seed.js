const http = require('http');

console.log('Seeding database via API endpoint...');

const req = http.request('http://localhost:3000/api/seed', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  console.log('Ensure dev server is running on http://localhost:3000');
});

req.end();
