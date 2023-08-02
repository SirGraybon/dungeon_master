CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL, 
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
);
CREATE TABLE character (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  character_name VARCHAR(255) NOT NULL,
  level INTEGER,
  max_health INTEGER,
  current_health INTEGER,
  gold INTEGER,
  avatar
  class VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL, 
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
);