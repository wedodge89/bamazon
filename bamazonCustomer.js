const inquirer = require("inquirer");
const mysql = require("mysql")
const Table = require("cli-table");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BurgerPass",
    database: "bamazon"
});

conn.connect(function(err) {
    if (err) throw err;
    startUp();
});

let selectedProduct = [];
let dbArray = [];

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

// Display table and call next funtion
function shopStart() {
    
    console.log("Welcome to Bamazon! Here's what is on sale today!");
    
    console.log(table.toString());
    
    purchase();
};

// The prompt that asks the user to select a product ID number and quantity
function purchase() {

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
                    selectedProduct.push(dbArray[i])
                    console.log(`You have chosen ${selectedProduct[0][1]}.`)
                }
            };
        } else {
            console.log("Please enter a valid product ID number.");
            purchase();
            return;
        }
    })
};

function quantity() {
    console.log("Working so far.")
}
























// const inquirer = require("inquirer");
// const mysql = require("mysql");
// const Table = require("cli-table")

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "BurgerPass",
//     database: "bamazon"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     startUp();
// });

// let selectedProduct = [];
// let dbArray = [];

// function startUp() {

//     let table = new Table ({
//         head: ["ID #", "Product Name", "Department", "Price", "Stock"],
//         colWidths: [7, 50, 25, 10, 7]
//     });

//     con.query("SELECT * FROM products", function (err, result) {
//         if (err) throw err;
//         for (let i = 0; i < result.length; i ++) {
//             table.push(
//             [
//             result[i].item_id,
//             result[i].product_name,
//             result[i].department_name,
//             result[i].price,
//             result[i].stock_quantity
//             ]
//             )   
//     dbArray.push(
//         [
//             result[i].item_id,
//             result[i].product_name,
//             result[i].department_name,
//             result[i].price,
//             result[i].stock_quantity
//             ]
//         )
//     shopStart()
// };

// function shopstart() { //1
//         console.log("Welcome to Bamazon! Here's what's on sale today.")
//         console.log(table.toString())

//         //inquirer #1
//         inquirer
//         .prompt(
//             {
//             type: "list",
//             name: "product",
//             choices: function() {
//                 let productArray = [];
//                 for (let i = 0; i < result.length; i ++) {
//                 productArray.push(result[i].product_name);
//                 }
//             return productArray;
//             },
//             message: "Which product would you like to order?"
//             }
//         )
//         .then(function buyNumber(answer) { //2

//             let item = answer;

//             for (let i = 0; i < dbArray.length; i ++) {
//                 if (dbArray[i][1] === item.product) {
//                     selectedProduct.push(dbArray[i])
//                 };
//             }

//             inquirer
//             .prompt(
//                 {
//                     type: "number",
//                     name: "amount",
//                     message: "How many would you like?"
//                 }
//             ).then(function(answer) {
//                 let purchaseProduct = selectedProduct[0][1];
//                 let purchasePrice = selectedProduct[0][3];
//                 let purchaseStock = selectedProduct[0][4];
//                 let totalCost = purchasePrice * answer.amount;
//                 if (answer.amount <= 0 || isNaN(answer.amount)) {
//                     console.log("Please input a valid (positive, non-zero) number.");
//                     buyNumber(purchaseProduct);
//                 } else if (answer.amount > purchaseStock) {
//                     console.log("I'm sorry, but we don't have that many in stock. Please try again with a smaller order.");
//                     buyNumber(purchaseProduct);
//                 } else {
//                     if (answer.amount === 1) {
//                         console.log(`That's ${answer.amount} copy of ${purchaseProduct} at $${purchasePrice}. Enjoy!`)
//                     } else {
//                         console.log(`That's ${answer.amount} copies of ${purchaseProduct} at $${purchasePrice} each. That's a total of $${totalCost}. Enjoy!`);
//                         let updatedQuantity = purchaseStock -= parseInt(answer.amount);
//                         console.log(`That leaves ${updatedQuantity} in stock.`);
//                         con.query(
//                         "UPDATE products SET ? WHERE ?",
//                             [
//                                 {
//                                 stock_quantity: updatedQuantity
//                                 },
//                                 {
//                                 product_name: purchaseProduct
//                                 }
//                             ]
//                         ).then(function(answer) { //4
//                             inquirer
//                             .prompt(
//                                 {
//                                 type: "confirm",
//                                 name: "buyMore",
//                                 default: true,
//                                 message: "Would you like to continue shopping?"
//                                 }
//                             ).then(function(answer) { //5
//                                 if (answer.buyMore) {
//                                 startUp();
//                                 } else {
//                                     console.log("Thanks for shopping with us today!");
//                                     con.end();
//                                     process.exit();
//                                 };
//                             });
//                         });
//                     };//else
            
//             });
//     };