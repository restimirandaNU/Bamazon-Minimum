-- USED TO CREATE DATABASE
CREATE DATABASE bamazon_db;

-- USED TO USE DATABASE
USE bamazon_db;

-- USED TO CREATE TABLE
CREATE TABLE products (
item_id INTEGER(11) auto_increment not NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100),
price INTEGER(11),
stock_quantity INTEGER (11),
PRIMARY KEY (item_id)
);

-- SELECT DATABASE
USE bamazon_db;


-- POPULATE DATABASE
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Circular Saw", "HOME IMPROVEMENT", 50, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Handsaw", "HOME IMPROVEMENT", 40, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Compact Saw", "HOME IMPROVEMENT", 60, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dust Bag", "HOME IMPROVEMENT", 10, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cool Blocks", "HOME IMPROVEMENT", 15, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Saw Guide", "HOME IMPROVEMENT", 10, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dust Hood", "HOME IMPROVEMENT", 10, 140);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nest Cam Outdoor", "CAMERA & PHOTO", 200, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nest Thermostat", "HOME IMPROVEMENT", 250, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nest Cam Indoor", "CAMERA & PHOTO", 200, 23);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nest Smoke Alarm", "HOME IMPROVEMENT", 200, 17);

 

