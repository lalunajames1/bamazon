var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    getItems();
  });

function getItems(){
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;

        console.log('  ID   |       Product Name      |    Price   | Quantity');
        for(var i = 0; i < results.length; i++){
            console.log(results[i].item_id + "     |     " + results[i].product_name + "   |      $" + results[i].price + "   |    " + results[i].stock_quantity);
        }
        makePurchase();
    });  
}


function makePurchase(){

    inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is the ID of the product you want to buy?",
      name: "product_id"
    },
    {
      type: "input",
      message: "How many units of would you like to buy?",
      name: "quantity",
    }
  ])
  .then(function(inquirerResponse) {
    connection.query('SELECT * FROM products WHERE item_id=' + inquirerResponse.product_id, function (error, results, fields) {
        if (error) throw error;

        // console.log(results);
        if (inquirerResponse.quantity <  results[0].stock_quantity){
            //Make purchases
           connection.query('UPDATE products SET stock_quantity = ' + (results[0].stock_quantity - inquirerResponse.quantity) + ' WHERE item_id = ' + results[0].item_id, function (error, res, fields) {
            if (error) throw error;
            console.log('Your purchase total is $' + inquirerResponse.quantity * results[0].price);
            
            makePurchase();
        });  
        } else {
            console.log('Insufficient Quantity!')
        }
    })
  });
}