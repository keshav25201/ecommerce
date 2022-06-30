const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const auth = require('./routes/auth');
const product = require('./routes/product');
const cart = require('./routes/cart');
const order = require('./routes/order');
const payment = require('./routes/payment');
require('dotenv').config()
const app = express();
//database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("db connection successful"))
.catch(err => console.log(err))
app.use(cors({origin:['http://localhost:3000','https://js.stripe.com'],credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(passport.initialize());
require('./config/local-strategy');
app.use('/api/auth',auth);
app.use('/api/product',product);
app.use('/api/cart',cart);
app.use('/api/payment',payment);
app.use('/api/order',order);
app.listen(5000,() => {
    console.log('listening on port : 5000');
})