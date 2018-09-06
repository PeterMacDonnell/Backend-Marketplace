DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INTEGER (11) AUTO_INCREMENT,
product_name VARCHAR (30) NOT NULL,
department_name VARCHAR (30), 
product_price INTEGER (11),
product_stock INTEGER (11),
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, product_price, product_stock)
VALUES ("Petah's Poppin Protein Powdah", "Nutrition", 60, 140), ("Petah's full of glee tea", "Nutrition", 25, 500), ("WIP brand elbow sleeves", "Fitness", 40, 100), ("WIP brand HELLA DRY sweatband", "Fitness", 10, 200), ("510-Stacklyfe snapback hat", "Fashion", 25, 5), ("510-Stacklyfe baggy jeans", "Fashion", 200, 5), ("Petah's Frozen Beef 1 lb", "Nutrition", 10, 5000), ("Petah's Signature Bottle", "Other", 25, 40), ("WIP brand stringer", "Fashion", 99, 1), ("510-Stacklyfe tall-T", "Fashion", 5, 45);

