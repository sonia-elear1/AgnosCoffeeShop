# AgnosCoffeeShop
# Service AgnosCoffeeShop</br>
Description: Configurable microservice for agnos coffee shop apis

```
Node Version : 12.18.4
```  

Setup
==========
go to robo3t : set local host: 27017

Installation
============
To start authentication service run npm command:
```
$ npm i
$ npm run build
$ npm start
```

STRUCTURE DESCRIPTION
==========
- server
   - routes.js : Contains routes and its configuration
   - server.js: Contains Server to start service.
   - subfolder:
     - api: Api includes folder of orders and product with their respective index controller and      service file ;
       -  Index file include router of specific feature like product or order;
       - Controller file include the functin of api routes
       - Service file include the function required for api controller
     - config:
       - environment: Contains ENVIRONMENT SETUP
       - mongoose: Contains mongoose configuration
     - schema:
       - offers-schema: schema for offers in coffee shop where each product include single offer
       - orders-schema: order place by customer with respective estimated time and bill generated after calculation of offers applicable while placing order i.e either FREE/DISCOUNT
       - products-schema: schema to create and get product with validations
       - tax-schema: schema for the tax related in orders
       - users-schema: schema for user detail with unique contact info
      - utils:
        - constants: constants required in apis
        - cusyom-api-errors: customized error and error code required in apis
- dist: copy of ejs files into dist created apfter npm run build command required to run code as index is dist/serve
- AgnosCoffeeShop.postman_collection: POSTMAN COLLECTION OF API REQUEST IN JSON


FUNCTIONALITY
==========

1. createProduct:
  - API to create new product with unique product id
2. getProducts: 
  - API to get all the products available in shop
3. createOrder:
  -  API to create order with user detail of contactt number if user contact number already exist it will not create new user else will create new user detail in user schema.; validation of product ids added by customer; calculation of bill that includes offer like discount type : fixed/percent or free any on offer is available for a product as per current scenario and at last create product
4. updateOrderStatus:
  - this is made when the order is recieved after 15 min it will update the order to ready status, COLLECT CONTACT NUMBERS WHO PLACED THE ORDER 
  - TODO : SENDING MESSAGE IS PENDING
5. getOrder:
  - get order by order id with validation of valid mongo id 

