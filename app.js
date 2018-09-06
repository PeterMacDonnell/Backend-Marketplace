
// Connecting appropriate NPMs

var inquirer = require('inquirer');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'bootcamp',
  database: 'bamazon_db'
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  
  // run the first function
  showProducts();
});

function showProducts() {
	

	//seeking my table in mySQL
	query = 'SELECT * FROM products';

	// Here is the complete query
	connection.query(query, function(err, data) {
    if (err) throw err;
    
    

		console.log("All Products");
    console.log('...................\n');
    
    //Looping through all the items in my DB

		var allProducts = '';
		for (var i = 0; i < data.length; i++) {
			allProducts = '';
			allProducts += 'Item ID: ' + data[i].item_id + '  //  ';
			allProducts += 'Product: ' + data[i].product_name + '  //  ';
			allProducts += 'Department: ' + data[i].department_name + '  //  ';
      allProducts += 'Price: ' + data[i].product_price + '//';
      allProducts += 'Stock: ' + data[i].product_stock + '\n';

			console.log(allProducts);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//After showing all this, run the below function to allow the user to buy an item
	  	makeAPurchase();
	})
};

function makeAPurchase(){


	// Prompt the user to select an item and quanity based on its numerical item id
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
		
		}
	]).then(function(input) {
	
    //Defining the user's input
		var item = input.item_id;
		var quantity = input.quantity;

		// Seeking my DB and only using products therein
		var query = 'SELECT * FROM products WHERE ?';

		connection.query(query, {item_id: item}, function(err, data) {
      if (err) throw err;
     

			// If the user has selected an invalid item ID, data attay will be empty
			

			if (data.length === 0) {
				console.log('Please select an appropriate item ID!');
				showProducts();

			} else {
				var productData = data[0];

					// If the quantity requested by the user is in stock
				if (quantity <= productData.product_stock) {
					console.log('Awesome let\'\s place your order!');

					// making a query to update DB
					var updateQueryStr = 'UPDATE products SET product_stock = ' + (productData.product_stock - quantity) + ' WHERE item_id = ' + item;
					

					// Actually updating the DB
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total cost is' + productData.product_price * quantity + 'Thanks!');
						

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log("\n---------------------------------------------------------------------\n");

					showProducts();
				}
			}
		})
	})
}



