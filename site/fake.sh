#!/bin/sh
mkdir -p fake
wget -O fake/QueryResults.csv -nv --show-progress -c https://data.stackexchange.com/stackoverflow/csv/1726789
node src/fakers/admin.js
echo "Database successfully generated.\nYou can start the fake api with 'npm run fake:serve'"
