// Require necessary NPM packages
const inquirer = require("inquirer");
const mysql = require("mysql")
const Table = require("cli-table");

// Pass in credentials and parameters for MySQL database
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BurgerPass",
    database: "bamazon"
});

// Establish connection to MySQL database
conn.connect(function(err) {
    if (err) throw err;
    startUp();
});

// Instantiate dbArray for storing information from database
let dbArray = [];

// Instantiate purchase parameters as global variables
let idPurchase;
let productPurchase;
let deptPurchase;
let costPurchase;
let stockPurchase;
let quantityPurchase;

// Create formatted table for CLI
let table = new Table ({
    head: ["ID #", "Product Name", "Department", "Price", "Stock"],
    colWidths: [7, 50, 25, 10, 7]
});

// Creates product table, then calls next function.
function startUp() {

    conn.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i ++) {
            table.push(
                [
                    result[i].item_id,
                    result[i].product_name,
                    result[i].department_name,
                    result[i].price,
                    result[i].stock_quantity
                ]
            )
            dbArray.push(
                [
                    result[i].item_id,
                    result[i].product_name,
                    result[i].department_name,
                    result[i].price,
                    result[i].stock_quantity
                ]
            )
        };
        shopStart();
    });

};

// Display table and call next function
function shopStart() {
    
    console.log("Welcome to Bamazon! Here's what is on sale today!");
    
    console.log(table.toString());
    
    purchaseProduct();
};

// Prompt user to select product for purchase
function purchaseProduct() {

    inquirer
    .prompt(
        {
            type: "number",
            name: "product",
            message: "Please enter the ID number of the product you would like to purchase."
        }
    )
    .then(function (answer) {
        if (parseInt(answer.product) <= dbArray.length) {
            
            for (let i = 0; i < dbArray.length; i ++) {
                if (dbArray[i][0] === answer.product) {
                    idPurchase = dbArray[i][0]
                    productPurchase = dbArray[i][1]
                    deptPurchase = dbArray[i][2]
                    costPurchase = dbArray[i][3]
                    stockPurchase = dbArray[i][4]
                    console.log(`You have chosen ${productPurchase}.`)
                }
            };

            purchaseQuantity();

            return;

        } else {

            console.log("Please enter a valid product ID number.");

            purchase();
            
            return;
        };
    });
};

// Prompt the user for how many they would like to purchase.
function purchaseQuantity() {
    
    let maxQuantity = stockPurchase;
    
    inquirer
    .prompt(
        {
            type: "number",
            name: "quantity",
            message: "How many copies would you like? (Max: " + maxQuantity + ")"
        }
    ).then(function(answer) {

        quantityPurchase = answer.quantity;

        if (parseInt(quantityPurchase) <= parseInt(maxQuantity) && (parseInt(quantityPurchase) >= 1)) {
            
            confirmPurchase();

        } else if (parseInt(quantityPurchase) <= 0) {

            console.log("Please choose a number greater than 0.");

            purchaseQuantity(product);

        } else {

            console.log("We don't have that many in stock. Please enter a lower number.");

            purchaseQuantity(product);

        }
    });
};

// Confirm purchase before querying database
function confirmPurchase() {
    
    let totalCost = parseInt(quantityPurchase) * parseFloat(costPurchase);
    
    if (quantityPurchase > 1) {

        inquirer
        .prompt(
            {
                type: "confirm",
                name: "confirm",
                message: `To confirm, that's ${quantityPurchase} copies of ${productPurchase} at $${costPurchase} each for a total of $${totalCost}. Is that correct?`,
                default: "true"
            }
        ).then(function(answer) {

            makePurchase(answer);

        })
    } else {

        inquirer
        .prompt(
            {
                type: "confirm",
                name: "confirm",
                message: `To confirm, that's 1 copy of ${productPurchase} for $${costPurchase}. Is that correct?`,
                default: "true"
            }
        ).then(function(answer) {

            makePurchase(answer);

        });
    }
};

function makePurchase(answer) {

    if (answer.confirm === true) {
        
        let updatedQuantity = parseInt(stockPurchase) - parseInt(quantityPurchase);
        
        conn.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: updatedQuantity
                },
                {
                    item_id: idPurchase
                }
            ]
            );

        console.log(`That leaves ${updatedQuantity} in stock.`);

        buyMore();

        } else {
        console.log("Let's start over.");
        purchaseProduct();
    }
};

// Prompt the user to continue shopping
function buyMore() {

    inquirer
    .prompt(
        {
            type: "confirm",
            name: "buyMore",
            default: "true",
            message: "Would you like to keep shopping?"
        }
    ).then(function(answer) {

        if (answer.buyMore == true) {

            startUp();

        } else {

            console.log("Thanks for shopping with us today!");

            conn.end();

            process.exit();
            
        }
    });
};