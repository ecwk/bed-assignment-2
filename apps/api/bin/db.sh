#!/bin/bash

# Runs the sql scripts
read -p "Enter user" user
read -p "Enter password" password

mysql -u $user -p$password < init-database.sql && mysql -u $user -p$password < seed-database.sql && echo "Database initialized" || echo "Database not initialized"
