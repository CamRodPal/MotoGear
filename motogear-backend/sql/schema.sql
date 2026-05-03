CREATE DATABASE IF NOT EXISTS motogear_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE motogear_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100)        NOT NULL,
  email        VARCHAR(150)        NOT NULL UNIQUE,
  password     VARCHAR(255)        NOT NULL,  -- bcrypt hash
  created_at   DATETIME            DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME            DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
