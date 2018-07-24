CREATE DATABASE IF NOT EXISTS bamazon; 

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (60) NOT NULL,
    department_name VARCHAR (60) NOT NULL,
    price DEC (10, 2) NOT NULL,
    stock_quantity INT (10),
    PRIMARY KEY (item_id)
);

SELECT * FROM products; 