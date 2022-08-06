#!/bin/bash

# Runs the sql scripts
$user="root"
read -p "Enter username[$user]: " temp
if [ -n "$temp" ]; then
    user=$temp
fi

$password="password"
read -p "Enter password[$password]: " temp
if [ -n "$temp" ]; then
    password=$temp
fi

mysql -u $user -p$password < init-database.sql
mysql -u $user -p$password < seed-airports.sql
mysql -u $user -p$password < seed-flights.sql
mysql -u $user -p$password < seed-users.sql

echo "Done"
