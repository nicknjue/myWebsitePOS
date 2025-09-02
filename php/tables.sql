-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS food_ordering;
USE food_ordering;

-- Create the 'orders' table
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    preferences TEXT,
    mode_of_payment ENUM('Cash', 'Card', 'Mobile Payment', 'Online') NOT NULL,
    town VARCHAR(100),
    food_items TEXT NOT NULL,
    food_items_quantity TEXT NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(20) DEFAULT 'Pending'
);
