#!/bin/bash

# Runs the sql scripts

mysql -u root -p < init-database.sql
mysql -u root -p < seed-database.sql