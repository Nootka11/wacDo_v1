const Product = require("../models/Product");
const fs = require('fs');


// 
exports.createProduct = async (req, res) => {
  
  console.log('creando');
  console.log('BODY',req.body); 
  console.log('file',req.file);

  if (!req.body) {
    return res.status(400).json({ message: 'No se recibieron datos en el body' });
  }

 
    try {
      const { name, description,  price, category, stock } = req.body || {};

      // Construir la ruta de la imagen
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    // console.log(req.file)
  
      // Crear un nuevo producto usando el modelo Product
      const newProduct = new Product({
        name,
        description,
        imageUrl,
        price, 
        category,
        stock
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

  //===========================
  // Modifier un product 
  exports.modifyProduct = async (req, res) => {
    try{
      console.log('modificando');
      
      const { name, description,  price, category, stock } = req.body || {};
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const updatedFields = {
      name,
      description,
      price,
      category,
      stock
    };

    if (imageUrl) {
      updatedFields.imageUrl = imageUrl;
    }

       await Product.updateOne({_id: req.params.id}, updatedFields);
       res.status(200).json({message: 'Produit modifié avec succès !'})
   

    } catch (error){
      console.error("Erreur lors de la modification du produit :", error);
      res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });

    }
    
   
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
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let products;

    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération des produits", error: error.message });
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