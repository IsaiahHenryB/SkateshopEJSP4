// 1. Type our usual server setup below (express, port, path, morgan)
const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const PORT = 3000


// 2. Set statement (ejs)
app.set('view engine','ejs')

// 3. Use statements
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

// 4. Go to the bottom of this file and create the server

// Data for EJS files
let userName = 'CodeSquader';
let date = new Date();
let year = date.getFullYear();
let signedIn = false;
let onSale = false;

// Array containing 3 objects
let inventory = [
    {
        _id: '001',
        name: 'skateboard',
        numberOfWheels: 4,
        price: 50.00,
    },
    {
        _id: '002',
        name: 'bike',
        numberOfWheels: 2,
        price: 100.00,
    },
    {
        _id: '003',
        name: 'roller skates',
        numberOfWheels: 8,
        price: 35.00,
    }
]

// 5. Write the routes and by pass the proper data to the ejs page
app.get('/', (request, response) =>{
    response.render('pages/index' ,{
        loggedIn: signedIn,
        name: userName,
        copyrightYear: year,
    })
});
app.get('/about', (request, response) =>{
    response.render('pages/about' ,{
        loggedIn: signedIn,
        name: userName,
        copyrightYear: year,
    })
});

app.get('/inventory', (request, response) =>{
    response.render('pages/inventory' , {
        loggedIn: signedIn,
        name: userName,
        copyrightYear: year,
        inventoryArray: inventory,
    })
})

// 5.1 this route is given to you but you still need to pass the proper data
app.get('/product/:_id', (request, response) => {
    let params = request.params;
    console.log(params);
    if (params._id === '001') {
        response.render('pages/product', {
            sale: onSale,
            loggedIn: signedIn,
            name: userName,
            copyrightYear: year,
            inventoryItem: inventory[0]
        });
    } else if (params._id === '002') {
        response.render('pages/product', {
            sale: onSale,
            loggedIn: signedIn,
            name: userName,
            copyrightYear: year,
            inventoryItem: inventory[1]
        });
    } else if (params._id === '003') {
        response.render('pages/product', {
            sale: onSale,
            loggedIn: signedIn,
            name: userName,
            copyrightYear: year,
            inventoryItem: inventory[2]
        });
    } else {
        response.send(`This product doesn't exist. Try searching again. `);        
    };
});

// 6 Go to inventory.ejs and follow instructions there.

// 7. Go to product.ejs and follow instructions there.
// Now that you need the inventory array in the product page, make sure to pass it over in the route.


// BONUS
// 8. Go to the navigation-bar.ejs partial and follow instructions there.
// After you complete instruction in navigation-bar, modify your routes again to pass over the data needed. Test by setting signedIn to false.

// 9. There's a flash sale, make sure all items are 10% off!

// 4. Server:
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});