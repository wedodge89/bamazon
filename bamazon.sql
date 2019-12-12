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
VALUES ("Super Duper Pretendo", "Electronics", 250.00, 175),
		("G.I. Jeff Action Figure", "Toys/Games", 7.99, 500),
        ("Ibsen Electric Guitar", "Musical Instruments", 1500.00, 25),
        ("YBox One and a Half", "Electronics", 350.00, 165),
        ("StayPlation 6", "Electronics", 349.99, 166),
        ("Karbie & Ben Dolls 2-Pack", "Toys/Games", 14.78, 500),
        ("Perry Hotter and the Stoner's Philosophy", "Books", 9.99, 666),
        ("Perry Hotter and the Secret of Chambers", "Books", 9.99, 666),
        ("Perry Hotter and the Convict of Bazkahan", "Books", 9.99, 666),
		("Perry Hotter and the Really Hot Cup", "Books", 9.99, 666),
        ("Perry Hotter and the Really Hot Bird Club", "Books", 9.99, 665),
        ("Perry Hotter and the Full-Bodied Prince", "Books", 9.99, 667),
        ("Perry Hotter and the Killy Stuff","Books", 12.99, 999),
        ("Kalvin Clein Blue Jeans", "Clothing", 59.99, 50),
        ("Ed Softy T-Shirt","Clothing", 29.99, 50);
        
SELECT * FROM products;
