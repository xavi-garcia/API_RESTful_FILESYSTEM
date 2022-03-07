const express = require('express');
const ProductsManager = require('../Managers/ProductsManager');
const uploader = require('../services/Upload');
const validateUser = require('../services/Middleware');

const router = express.Router();

const productService = new ProductsManager();

router.get('/', (req, res)=>{
    productService.getAll().then(result=>res.send(result))
})

router.get('/:id', async (req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({error:"incorrect id"});
    let number = parseInt(id);
    productService.getById(number).then(result=>res.send(result))
});

router.get('/:id/delete', validateUser, async (req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({error:"incorrect id"});
    let number = parseInt(id);
    productService.deleteProduct(number).then(result=>res.send(result))
});

router.post('/', uploader.single('file'), validateUser, async (req, res)=>{
    let product = req.body;
    console.log(product)
    // let file = req.file;
    // if(!file) return res.status(500).send({error:"Couldn't upload file"});
    // product.thumbnail = req.protocol+"://"+req.hostname+":8080"+file.filename;
    productService.add(product).then(result=>res.send(result));
});

router.put('/:id',validateUser, async (req, res) => {
    const id = parseInt(req.params.id);
    let newData = req.body;
    let upDateItem = await productService.updateById(id, newData);
    res.send(upDateItem);
});


module.exports = router;