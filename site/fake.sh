#!/bin/sh
mkdir fake
wget -O fake/QueryResults.csv -c https://data.stackexchange.com/stackoverflow/csv/1726789
node src/fakers/admin.js
