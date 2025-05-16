const Menu = require("../models/Menu");

// Fonction pour créer un nouveau menu
exports.createMenu = async (req, res) => {
    try {
      console.log("menu que llega al back",req.body)
      const { title, description, price } = req.body;
      
      const rawProducts = JSON.parse(req.body.products);
      const products = Object.values(rawProducts);

      //const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
      // Création d'un nouveau menu en utilisant le modèle Menu
      const newMenu = new Menu({
        title,
        description,
        products,
        imageUrl,
        price,
      });      
  
      // Sauvegarde du menu dans la base de données
      await newMenu.save();
  
      res.status(201).json({
        message: 'Menu créé avec succès',
        menu: newMenu
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la création du menu',
        error: error.message
      });
    }
  };



// Récupérer un seul menu
exports.getOneMenu =  (req,res,next)=>{
    Menu.findOne({ _id: req.params.id }) 
    .then(menu=> res.status(200).json(menu))
    .catch(error =>res.status(400).json(error));
}

// Récupérer tous les menus
exports.getAllMenus = (req, res, next) => {
  Menu.find()
    .then(menus => res.status(200).json(menus))
    .catch(error => res.status(400).json(error))
   }

// Modifier un menu
exports.modifyMenu = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    
    // Procesar products (viene como JSON string)
    const rawProducts = JSON.parse(req.body.products);
    const products = Object.values(rawProducts);

    // Procesar imagen
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedFields = {
      title,
      description,
      price,
      products,
    };

    if (imageUrl) {
      updatedFields.imageUrl = imageUrl;
    }

    await Menu.updateOne({ _id: req.params.id }, updatedFields);

    res.status(200).json({ message: 'Menu modifié' });
  } catch (error) {
    console.error("Erreur lors de la modification du menu :", error);
    res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
  }
};
// Supprimer un menu 
exports.deleteMenu = (req,res,next)=>{
  Menu.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({message:'Menu suprime'}))
  .catch(error =>res.status(400).json(error))
}



