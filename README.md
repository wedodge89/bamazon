# Bamazon

This app uses node.js and MySQL with some npm packages to replicate an Amazon-style storefront where customers can purchase a variety of products.

## Purpose

This app simulates an online shopping experience using Node.js. The user can shop a selection of parody products . 

In terms of my own development, this project taught me a lot about using Node.js, and specifically using it with a MySQL database. 

## Process
Upon being started via node, the application makes a connection to the relevant MySQL database. Then, it uses the CLI-Table package to create a clean table of all of the products for sale and their department, price, etc. In addition to creating the table, it also creates an array with these objects. 

It then uses inquirer to ask the user to select a product from the table, followed by asking them how many of the selected item they wish to purchase. If the user inputs an invalid answer (not a number/zero or less), or inputs a number higher than the chosen item's stock quantity, the program starts over from that question. If, however the amount passes both of these tests, then the program logs the total for that many copies of the selected item, updates the MySQL table, and then logs the new number left in stock.

Finally, the user is asked if they wish to continue shopping on Bamazon. If yes (default), the process starts over. Otherwise, the application closes.