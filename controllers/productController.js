const Product = require("../models/Product");
const fs = require('fs');

// Función para crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
      const { name, description, imageUrl, price } = req.body;
  
      // Crear un nuevo producto usando el modelo Product
      const newProduct = new Product({
        name,
        description,
        imageUrl,
        price
      });
      
  
      // Guardar el producto en la base de datos
      await newProduct.save();
  
      res.status(201).json({
        message: 'Producto creado correctamente',
        product: newProduct
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al crear el producto',
        error: error.message
      });
    }
  };

exports.getOneProduct =  (req,res,next)=>{
    Product.findOne({ _id: req.params.id }) 
    .then(product=> res.status(200).json(product))
    .catch(error =>res.status(400).json(error));
}

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json(error))
   }