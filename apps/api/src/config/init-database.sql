DROP DATABASE IF EXISTS sp_air;
CREATE DATABASE sp_air;
USE sp_air;
CREATE TABLE users (
  `user_id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `contact` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL,
  `profile_pic_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE(`username`),
  UNIQUE(`email`),
  UNIQUE(`contact`)
);
CREATE TABLE airport (
  `airport_id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`airport_id`),
  UNIQUE(`name`)
);
CREATE TABLE flight (
  `flight_id` INTEGER NOT NULL AUTO_INCREMENT,
  `flight_code` VARCHAR(255) NOT NULL,
  `aircraft_name` VARCHAR(255) NOT NULL,
  `origin_airport_id` INTEGER NOT NULL,
  `destination_airport_id` INTEGER NOT NULL,
  `embark_date` VARCHAR(255) NOT NULL,
  `travel_time` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`flight_id`),
  UNIQUE(`flight_code`),
  FOREIGN KEY (`origin_airport_id`) REFERENCES airport(`airport_id`),
  FOREIGN KEY (`destination_airport_id`) REFERENCES airport(`airport_id`)
);
CREATE TABLE booking (
  `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `passport` VARCHAR(255) NOT NULL,
  `nationality` VARCHAR(255) NOT NULL,
  `age` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  `flight_id` INTEGER NOT NULL,
  PRIMARY KEY (`booking_id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
  FOREIGN KEY (`flight_id`) REFERENCES flight(`flight_id`) ON DELETE CASCADE
);