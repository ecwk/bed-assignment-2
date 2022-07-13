CREATE DATABASE IF NOT EXISTS sp_air;
USE sp_air;

CREATE TABLE users (
  `userid` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `contact` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Customer', 'Admin') NOT NULL,
  `profile_pic_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE(`username`),
  UNIQUE(`email`),
  UNIQUE(`contact`)
);
CREATE TABLE airport (
  `airportid` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`airportid`),
  UNIQUE(`name`)
);
CREATE TABLE flight (
  `flightid` INTEGER NOT NULL AUTO_INCREMENT,
  `flightCode` VARCHAR(255) NOT NULL,
  `aircraft` VARCHAR(255) NOT NULL,
  `originAirport` INTEGER NOT NULL,
  `destinationAirport` INTEGER NOT NULL,
  `embarkDate` VARCHAR(255) NOT NULL,
  `travelTime` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`flightid`),
  UNIQUE(`flightCode`),
  FOREIGN KEY (`originAirport`) REFERENCES airport(`airportid`),
  FOREIGN KEY (`destinationAirport`) REFERENCES airport(`airportid`)
);
CREATE TABLE booking (
  `bookingid` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `passport` VARCHAR(255) NOT NULL,
  `nationality` VARCHAR(255) NOT NULL,
  `age` INTEGER NOT NULL,
  `userid` INTEGER NOT NULL,
  `flightid` INTEGER NOT NULL,
  PRIMARY KEY (`bookingid`),
  FOREIGN KEY (`userid`) REFERENCES users(`userid`),
  FOREIGN KEY (`flightid`) REFERENCES flight(`flightid`) ON DELETE CASCADE
);