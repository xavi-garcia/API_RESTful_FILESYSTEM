const express = require('express');
const CartManager = require ('../Managers/CartManager');
const uploader = require('../services/Upload');

const router = express.Router();

const cartService = new CartManager();

//Creates a cart with its id
router.post('/',uploader.single('file'), async (req, res)=>{
    let cart = req.body;
    console.log(cart)
    cartService.create(cart).then(result=>res.send(result));
});

//Finds cart from its id
router.get('/:id', async (req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({error:"incorrect id"});
    let number = parseInt(id);
    cartService.getById(number).then(result=>res.send(result))
});

//Deletes cart with its id
router.get('/:id/delete', async (req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({error:"incorrect id"});
    let number = parseInt(id);
    cartService.deleteCart(number).then(result=>res.send(result))
});


//Gets an existing cart and adds a product to it
router.post('/:id/products', (req, res) => {
    let cartId = parseInt(req.params.id);
    let prodId = req.body.id;
    console.log(prodId, cartId);
    cartService.addProductToCart(cartId, prodId).then((result) => res.send(result));
});

//Gets a prod from cart and deletes it
router.delete('/:id/products/:id_prod', (req, res) => {
    let cartId = parseInt(req.params.id);
    let prodId = req.body.id;
    console.log(cartId, prodId)
    cartService.deleteProduct(cartId, prodId).then((result) => res.send(result));
});


module.exports = router