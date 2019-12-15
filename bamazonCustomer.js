const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "V4mp1r3z",
    database: "bamazon"
});

con.connect(function(err) {
    if (err) throw err;
    startUp();
});

function startUp() {
    let table = new Table ({
        head: ["ID #", "Product Name", "Department", "Price", "Stock"],
        colWidths: [7, 50, 25, 10, 7]
    });
    con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    for (let i = 0; i < result.length; i ++) {
    table.push([
        result[i].item_id,
        result[i].product_name,
        result[i].department_name,
        result[i].price,
        result[i].stock_quantity
    ])
    };
    console.log(table.toString());
    }
    )};
