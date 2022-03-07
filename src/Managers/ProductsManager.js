const fs = require('fs');
const moment = require('moment');

const pathToProducts = __dirname +'/../files/products.json';

const fetch = async() =>{
    let data = await fs.promises.readFile(pathToProducts,'utf-8');
    let products = JSON.parse(data);
    return products;
}

class ProductsManager {

    add = async (product) => {
        if (fs.existsSync(pathToProducts)) {
            try {
                let products = await fetch();
                if (products.length === 0){
                    product.id = 1;
                    product.time = moment().format('MMMM Do YYYY, h:mm:ss a');
                    await fs.promises.writeFile(pathToProducts, JSON.stringify([products],null,2))
                    return {status:"success", message:"one product was added"}
                }
                product.id = products[products.length -1].id+1;
                product.time = moment().format('MMMM Do YYYY, h:mm:ss a');
                products.push(product);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(products,null,2))
                return {status:"success", message:"one product was added"}
            }catch(error){
                return {status:"error", error: error}
            }
        }
        product.id = 1;
        product.time = moment().format('MMMM Do YYYY, h:mm:ss a');
        await fs.promises.writeFile(pathToProducts, JSON.stringify([product],null,2))
        return {status:"success",message:"one product was added"}
    }

    getAll = async() =>{
        if(fs.existsSync(pathToProducts)){
            try{
                let products = await fetch();
                return {products}
            }catch(error){
                return {status:"error", error:error}
            }
        }else{
            return {products}
        }
    }

    getById = async (id) =>{
        if(fs.existsSync(pathToProducts)){
            let products = await fetch();
            let product = products.find(p=>p.id===id);
            if(product) return {product}
            else return {status: "fail", error:"no such product"}
        }
    }

    deleteProduct = async (id) =>{
        if(fs.existsSync(pathToProducts)){
            let products = await fetch();
            let newProduct = products.filter(product=>product.id!==id)
            await fs.promises.writeFile(pathToProducts,JSON.stringify(newProduct,null,2))
            return {status:"success", message:"product deleted"}
        }
    }

    updateById = async (id, newProduct) => {
      if(fs.existsSync(pathToProducts)){
        try {
          let products = await fetch();
          const indexProduct = products.findIndex((product) => product.id === id);
          if (indexProduct === -1) {
            return {status:"error", message:"no such product"}
          }
          const productToBeUpdated = products[indexProduct];
    
          if (newProduct.name) {
            productToBeUpdated.name = newProduct.name;
          }
          if (newProduct.description) {
            productToBeUpdated.description = newProduct.description;
          }
          if (newProduct.code) {
            productToBeUpdated.code = newProduct.code;
          }
          if (newProduct.stock) {
            productToBeUpdated.stock = parseInt(newProduct.stock);
          }
          if (newProduct.price) {
            productToBeUpdated.price = parseFloat(newProduct.price);
          }
          if (newProduct.thumbnail) {
            productToBeUpdated.thumbnail = newProduct.thumbnail;
          }
    
          products[indexProduct] = productToBeUpdated;
    
          await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2));
          return {status:"success", message:"product updated", payload:productToBeUpdated}
        } catch (error) {
          return {error:"error", message:"failed to update product"}
        }
      }
        
    }


}
module.exports = ProductsManager;