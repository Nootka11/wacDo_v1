const Menu = require("../models/Menu");
const fs = require('fs');

// Función para crear un nuevo producto
exports.createMenu = async (req, res) => {
    try {
      const { title, products, price } = req.body;
  
      // Crear un nuevo producto usando el modelo Product
      const newMenu = new Menu({
        title,
        products,
        price
      });
      
  
      // Guardar el producto en la base de datos
      await newMenu.save();
  
      res.status(201).json({
        message: 'Menu creado correctamente',
        menu: newMenu
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al crear el menu',
        error: error.message
      });
    }
  };



//READ
exports.getOneMenu =  (req,res,next)=>{
    Menu.findOne({ _id: req.params.id }) 
    .then(menu=> res.status(200).json(menu))
    .catch(error =>res.status(400).json(error));
}

exports.getAllMenus = (req, res, next) => {
  Menu.find()
    .then(menus => res.status(200).json(menus))
    .catch(error => res.status(400).json(error))
   }

//UPDATE
exports.modifyMenu = (req,res,next)=>{
    Menu.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message:'Menu modifié'}))
    .catch(error =>res.status(400).json(error))
}
// DELETE 
exports.deleteMenu = (req,res,next)=>{
  Menu.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({message:'Menu suprime'}))
  .catch(error =>res.status(400).json(error))
}



