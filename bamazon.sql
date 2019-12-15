DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INTEGER (3) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DECIMAL (6, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    primary key (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Perry Hotter and the Stoner's Philosophy [1/7]", "Books", 9.99, 666),
        ("Perry Hotter and the Secret of Chambers [2/7]", "Books", 9.99, 666),
        ("Perry Hotter and the Convict of Bazkahan [3/7]", "Books", 9.99, 666),
		("Perry Hotter and the Really Hot Cup [4/7]", "Books", 9.99, 666),
        ("Perry Hotter and the Really Hot Bird Club [5/7]", "Books", 9.99, 665),
        ("Perry Hotter and the Full-Bodied Prince [6/7]", "Books", 9.99, 667),
        ("Perry Hotter and the Killy Stuff [7/7]","Books", 12.99, 999),
        ("Kelvin Clean Blue Jeans", "Clothing", 59.99, 50),
        ("Ned Softy T-Shirt","Clothing", 29.99, 50),
		("StayPlation 6", "Electronics", 349.98, 166),
        ("Super Duper Pretendo", "Electronics", 249.99, 175),
        ("YBox One and a Half", "Electronics", 349.99, 165),
		("Ibsen Electric Guitar", "Musical Instruments", 1499.99, 25),
        ("G.I. Jeff Action Figure", "Toys/Games", 7.99, 500),
        ("Karbie & Ben Dolls 2-Pack", "Toys/Games", 14.78, 500);
        
SELECT * FROM products;
