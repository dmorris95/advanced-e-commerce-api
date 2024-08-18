Welcome to the Advanced E-commerce API
GitHub: https://github.com/dmorris95/advanced-e-commerce-api

This application uses the E-commerce API found here: https://github.com/dmorris95/e-commerce-api. Be sure to follow the directions for setting that part of the application up, before attempting to run this application.

In order to properly run this application the API linked aboved needs to be running in a virtual environment and the command 'flask run' needs to be run in the terminal of that application.
The next step is running this application using the command 'npm run dev'

Features:
    - The applciation features a navigation bar for navigating to different pages within the application. 
    
    - Individual pages showing Customers and Products within the Database
    
    - Individual pages with forms for adding a new customer, product, and order for a customer.

1. Customer Pages:
    - Customer page showing the list of current customers. Each customer has a link to take the user to the customer form to edit information about the customer. The page also contains a delete button for each customer to remove the customer from the database.
    - Customer form page with inputs for a customer name, email and phone. Contains validation for the users input to ensure a valid customer is sent to the database.
2. Product Pages:
    - Product page showing the list of current products in the database. The list of products contains a button for editing and deleting the product from the database. When clicking the delete button a Modal will appear asking the user if they are sure they wish to delete the product.
    - Product form page with inputs for a product's name and price and validation with feedback for each input.
3. Order Form:
    - Order form page with lists of the current customers and products within the database. The Customer ID and Product input fields are read-only to ensure valid data is input into the database. By clicking on a customer it populates the Customer ID box and by clicking on the products it populates the products within the order. Multiple products can be selected for each order of a customer. A Modal will pop up showing a successful order submission.
