//======NPM PACKAGES NPM INIT FOR PACKAGE JSON===========
var inquirer = require('inquirer');
var mysql = require('mysql');

// call once somewhere in the beginning of the app
//https://www.npmjs.com/package/console.table
var cTable = require('console.table');
const fs = require("fs");


// //=======CONNECTION=======================
var connection = mysql.createConnection ({
    host: "myconnection",
    port: 3306,
    //username
    user: "restimiranda",
    //your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    // console.log("connected as id " + connection.threadId);
});


//===========TEST/INTRO ====================
console.log("Hello World This is the BAMAZON app");


//------------cTable function------------
var showIt = function () {
//Query Method
  connection.query("SELECT * FROM products", function(err, res) {
     var cTable = new cTable({
     head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity Available'] 
    });
    console.log("Inventory List");
    //for loop which finds inventory list and pushes to cTable 
    for (var i = 0; i < res.length; i++) {
    cTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
     }     
     console.log(cTable.toString());
     console.log("------------------------------------") });
     connection.end();
};



//============SWITCH STATEMENTS======================
var runSearch = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Order Products", "Just Browse Available Products"]
    }).then(function(answer) {
        switch (answer.action) {
            case "Order Products":
            display();
            break;
            case "Just Browse Available Products":
            showIt();
            break;
        }
    })
}

//==========cTABLE DISPLAY ======================

var display = function () {
//Query Method
  connection.query("SELECT * FROM products", function(err, res) {
     var cTable = new cTable({
     head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity Available'] 
    });
    console.log("Inventory List");
    //for loop which finds inventory list and pushes to cTable 
    for (var i = 0; i < res.length; i++) {
    cTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
     }     
     console.log(cTable.toString());
     console.log("------------------------------------")
//==============INQUIRER PROMPT ================================
//Take type, name, message, choices[, default, filter] properties. 
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Input the ID of the product you want to purchase"
        },
        {  name: "units",
           type: "input",
           message: "How many would you like to purchase?",
           validate: function(value){
               if ((value)=== true || value > res.stock_quantity + 1) {
                   console.log("invalid");
               } else {
                   return true;
               }
           }
        },
    ]).then(function(user){
        console.log("User Buy Input: " + user.units);
        console.log("User product ID Input: " + user.item_id);


//===============DISPLAYS SELECTION PRICE & QUANTITY =====================

 //----------------ASSIGNS PRODUCT ---------   
        var productID = parseInt(user.item_id);
        productID = productID -1;
        var price = res[productID].price;
        console.log("Item Price" + " " +  price)

//-------------QUANTITY CHECK  -------------
    var qtyAvailable = res[productID].stock_quantity;
    console.log("In Stock" + " "+ qtyAvailable);

//================CHECK ORDER ====================================
    if(user.units>qtyAvailable){
        console.log("Insufficient Quantity");
    }else {
//-----------------PRINT FINAL PRICE---------
        var finalPrice = user.units * price;
        console.log("Final price is: $" + finalPrice);
        console.log("Order placed! Expect Shipment in 10-12 business days");
//===============CONNECT TO SQL/ UPDATE UNIT ====================
        connection.query("Update products SET ? WHERE ?", [{
            stock_quantity: qtyAvailable - user.units
        }, {
            item_id: res[productID].item_id
        }], function(err, res) {});
    }
    showIt();
     });
    });
};


runSearch();







