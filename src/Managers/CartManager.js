const fs = require('fs');
const moment = require('moment');
const ProductsManager = require('../Managers/ProductsManager');
const productService = new ProductsManager();

const pathToCart = __dirname +'/../files/cart.json';

const fetch = async() =>{
    let data = await fs.promises.readFile(pathToCart,'utf-8');
    let carts = JSON.parse(data);
    return carts;
}


class CartManager {


    create = async (cart) => {
        if (fs.existsSync(pathToCart)) {
            try {
                let carts = await fetch();
                if (carts.length === 0){
                    cart.id = 1;
                    cart.time = moment().format('MMMM Do YYYY, h:mm:ss a');
                    cart.product = [];
                    await fs.promises.writeFile(pathToCart, JSON.stringify([carts],null,2))
                    return {status:"success", message:"one cart was created"}
                }
                cart.id = carts[carts.length -1].id+1;
                cart.time = moment().format('MMMM Do YYYY, h:mm:ss a');
                cart.product = [];
                carts.push(cart);
                await fs.promises.writeFile(pathToCart, JSON.stringify(carts,null,2))
                return {status:"success", message:"one cart was created"}
            }catch(error){
                return {status:"error", error:error}
            }
        }
        cart.id = 1;
        cart.time = moment().format('MMMM Do YYYY, h:mm:ss a');
        cart.product = [];
        await fs.promises.writeFile(pathToCart, JSON.stringify([cart],null,2))
        return {status:"success", message:"one cart was created"}
    };

    getById = async (id) =>{
        if(fs.existsSync(pathToCart)){
            let carts = await fetch();
            let cart = carts.find(c=>c.id===id);
            if(cart) return {cart}
            else return {status: "fail", error:"no such cart"}
        }
    };

    deleteCart = async (id) =>{
        if(fs.existsSync(pathToCart)){
            let carts = await fetch();
            let newCart = carts.filter(cart=>cart.id!==id)
            await fs.promises.writeFile(pathToCart,JSON.stringify(newCart,null,2))
            return {status:"success", message:"cart deleted"}
        }
    };

    addProductToCart = async (cartId, prodId) => {
        try {
            if (fs.existsSync(pathToCart)) {
                let carts = await fetch();
                let cart = carts.find((c) => c.id === cartId);
                if (cart) {
                    let products = await productService.getById(prodId);
                    if (products) {
                        cart.product.push(products.product.id);
                        await fs.promises.writeFile(pathToCart, JSON.stringify(carts, null, 2));
                        return {status: "success", message: "product uploaded"};
                    }
                }
            }
        }catch (error){
            return { status: "error", message: "couldn't upload product" }
        }
    };

    deleteProduct = async (cartId, id_prod) => {
        if (fs.existsSync(pathToCart)) {
            let carts = await fetch();
            let cart = carts.find(cart => cart.id === cartId);
            if (cart) {
                let product = cart.product.find(prod => prod.id === id_prod);
                if (product) {
                    let emptyCart = cart.product.filter(prod => prod.id !== id_prod);
                    cart.product = emptyCart;
                    await fs.promises.writeFile(pathToCart,JSON.stringify(carts, null, 2));
                    return {status:"success", message:"product deleted"}
                } else {
                    return {status:"error", message:"couldn't find product"}
                }
            }
        }
    };

}
module.exports = CartManager;
