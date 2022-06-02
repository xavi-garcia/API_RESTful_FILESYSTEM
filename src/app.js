const express = require('express');
const productsRouter = require('./routes/Products');
const cartRouter = require ('./routes/Cart');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/products', productsRouter);
app.use('/cart', cartRouter)
app.use(express.static (__dirname+ '/public'))


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=> console.log(`Listening on ${PORT}`));