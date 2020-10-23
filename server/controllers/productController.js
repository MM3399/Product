//Importing built in modules
const path = require('path');

//Importing 3rd party modules
const chalk = require('chalk');

//Importing local modules
const productModel = require('../models/productModel');


//Sending all the products
exports.sendProducts = (req,res)=>{
    productModel.find((err,data)=>{
        if(err){
            res.json("There's error on the server side. Sorry for the inconvenience");
            console.log(chalk.red("There was error when serving the " + req.method + "method and error is" , err));
        }
        else{
            res.json(data);
        }
    })
}

//Saving a product
exports.getProduct = (req,res)=>{
    if(req.body.password === '3399'){
        product = new productModel({
            name: req.body.name,
            imagePath: path.join(__dirname, '..', req.file.path),
            price: req.body.price,
            description: req.body.description,
        });
        product.save().then(()=>{
            res.json("Product successfully saved");
        })
        .catch(err=>{
            console.log(chalk.red("Error in saving product",err));
            res.json("There's error on the server side. Sorry for the inconvenience");
        })
    }
    else{
        res.json("You are not authorized to save the data")
    }
}


//Sending a single product
exports.sendAProduct = (req,res)=>{
    productModel.findById(req.params.id , (err,data)=>{
        if (err) {
            res.json("There's error on the server side. Sorry for the inconvenience");
            console.log(chalk.red("There was error when serving the " + req.method + "method and error is", err));
        }
        else{
            res.json(data);
        }
    });
}
