const Product = require("../models/Product");
const fs = require('fs');

// Función para crear un nuevo producto
exports.createProduct = async (req, res) => {
  console.log('creando')
    try {
      const { name, description, imageUrl, price, category } = req.body;
  
      // Crear un nuevo producto usando el modelo Product
      const newProduct = new Product({
        name,
        description,
        imageUrl,
        price, 
        category
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
  //modificar un producto
  exports.modifyProduct = (req,res,next)=>{
    Product.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message:'Product modifié'}))
    .catch(error =>res.status(400).json(error))
}
// delete product
exports.deleteProduct = (req,res,next)=>{
  Product.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({message:'Produit supprimé avec succès'}))
  .catch(error =>res.status(400).json({message:'Produit non trouvé'}))
}


  

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

// Obtener productos por categoría
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los productos',
      error: error.message
    });
  }
};

// Función para crear múltiples productos
exports.createMultipleProducts = async (req, res) => {
  try {
    const products = req.body; // Esperamos que el cuerpo de la solicitud contenga un array de productos

    // Insertamos todos los productos a la vez
    const newProducts = await Product.insertMany(products);

    res.status(201).json({
      message: 'Produits crées',
      products: newProducts
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur dans la création de produits',
      error: error.message
    });
  }
};