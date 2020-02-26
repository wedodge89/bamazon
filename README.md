# Bamazon

This app uses node.js and MySQL with some npm packages to replicate an Amazon-style storefront where customers can purchase a variety of products.

## How to Run

In order to run this application on your local machine, you must first download the code. Then, from your Terminal (MacOS) or Command Prompt (Windows). Then, within that application, navigate to the [bamazon] folder. enter the command "npm install" to download the required packages. Then, simply type "node bamazonCustomer.js".

## Purpose

This app simulates an online shopping experience using Node.js. The user can shop a selection of parody products. 

In terms of my own learning, this project taught me a lot about using Node.js, and specifically using it with a MySQL database. 

## Process
Upon being started via node, the application makes a connection to the relevant MySQL database. Then, it uses the CLI-Table package to create a clean table of all of the products for sale and their department, price, etc. In addition to creating the table, it also creates an array with these objects. 

First, it asks the user to select a product from the table by entering a product ID number. If the user enters anything that is not a valid product ID number (whether it is too high, too low, or not a number), a message is printed to retry, and then the app starts over from that point.

Next, the user selects a quantity of the product to purchase. Again, tests are run to ensure that a valid number that is less than or equal to the amount is stock is selected.

Before finalizing the purchase and updating the database, a final prompt asks the user to confirm the total purchase, including product name, quantity, unit cost, and total cost. 

