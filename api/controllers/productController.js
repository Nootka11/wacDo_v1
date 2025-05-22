const Product = require("../models/Product");
const fs = require('fs');


// Créer un produit
exports.createProduct = async (req, res) => {

  // console.log('creando');
  // console.log('BODY',req.body); 
  // console.log('file',req.file);

  if (!req.body) {
    return res.status(400).json({ message: 'Aucune donnée reçue dans le corps de la requête' });
  }


  try {
    const { name, description, price, category, stock } = req.body || {};

    // Construire le chemin de l'image
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';


    // Créer un nouveau produit en utilisant le modèle Product
    const newProduct = new Product({
      name,
      description,
      imageUrl,
      price,
      category,
      stock
    });


    // Sauvagardee le produit dans la base de données
    await newProduct.save();

    res.status(201).json({
      message: 'Produit créé avec succès',
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création du produit',
      error: error.message
    });
  }
};

//===========================
// Modifier un product 
exports.modifyProduct = async (req, res) => {
  try {
    console.log('modifying');

    const { name, description, price, category, stock } = req.body || {};
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

    await Product.updateOne({ _id: req.params.id }, updatedFields);
    res.status(200).json({ message: 'Produit modifié avec succès !' })


  } catch (error) {
    console.error("Erreur lors de la modification du produit :", error);
    res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });

  }


}


// Supprimer un produit
exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Produit supprimé avec succès' }))
    .catch(error => res.status(400).json({ message: 'Produit non trouvé' }))
}



// Obtenir un produit par ID
exports.getOneProduct = (req, res, next) => {

  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json(error));
}

// Obtenir tous les produits (optionnellement filtrés par catégorie)
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



// Créer plusieurs produits
exports.createMultipleProducts = async (req, res) => {
  try {
    const products = req.body; // Esperamos que el cuerpo de la solicitud contenga un array de productos

    // Insérer tous les produits en une seule opération
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