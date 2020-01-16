const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BurgerPass",
    database: "bamazon"
});

con.connect(function(err) {
    if (err) throw err;
    startUp();
});

let selectedProduct = [];
let dbArray = [];

function startUp() {
    let table = new Table ({
        head: ["ID #", "Product Name", "Department", "Price", "Stock"],
        colWidths: [7, 50, 25, 10, 7]
    });
    con.query("SELECT * FROM products", function (err, result) {
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

    console.log("Welcome to Bamazon! Here's what's on sale today.")
    console.log(table.toString())
    inquirer
    .prompt(
            {
            type: "list",
            name: "product",
            choices: function() {
                let productArray = [];
                for (let i = 0; i < result.length; i ++) {
                productArray.push(result[i].product_name);
                }
            return productArray;
            },
            message: "Which product would you like to order?"
            }
        )
    .then(function buyNumber(answer) {
        let item = answer;
        for (let i = 0; i < dbArray.length; i ++) {
            if (dbArray[i][1] === item.product) {
            selectedProduct.push(dbArray[i])
            };
            }
        inquirer
        .prompt(
            {
                type: "number",
                name: "amount",
                message: "How many would you like?"
            }
        ).then(function(answer) {
            let purchaseProduct = selectedProduct[0][1];
            let purchasePrice = selectedProduct[0][3];
            let purchaseStock = selectedProduct[0][4];
            let totalCost = purchasePrice * answer.amount;
            if (purchaseStock >= answer.amount && answer.amount > 0) {
            if (answer.amount === 1) {
                console.log(`That's ${answer.amount} copy of ${purchaseProduct} at $${purchasePrice}. Enjoy!`)
            } else {
                console.log(`That's ${answer.amount} copies of ${purchaseProduct} at $${purchasePrice} each. That's a total of $${totalCost}. Enjoy!`)
            }
            let updatedQuantity = purchaseStock -= parseInt(answer.amount);
            console.log(`That leaves ${updatedQuantity} in stock.`)
            con.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: updatedQuantity
                    },
                    {
                        product_name: purchaseProduct
                    }
                ],
                )
        } else if (answer.amount <= 0) {
            console.log("Please input a valid (positive, non-zero) number.");
            buyNumber(answer);
        } else {
            console.log("I'm sorry, but we don't have that many in stock. Please try again with a smaller order.");
            buyNumber(answer);
        }
        }).then(function(answer) {
            inquirer
            .prompt(
                {
                    type: "confirm",
                    name: "buyMore",
                    default: "true",
                    message: "Would you like to continue shopping?"
                }
            ).then(function(answer) {
                if (answer === true) {
                    startUp();
                } else {
                    console.log("Thanks for shopping with us today!");
                    con.end();
                    process.exit();
                }
            })
        });
    })})}