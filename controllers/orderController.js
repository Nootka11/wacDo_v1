const Order = require('../models/Order');
const Product = require('../models/Product');
const Menu = require('../models/Menu');
const { calculateTotal } = require('../utils/orderUtils');



exports.createOrder = (req, res) => {
  const { productIds, menuIds } = req.body;  // Récupère les IDs des produits, des menus
 

  // 1. Récupère les produits par leurs IDs
  Product.find({ '_id': { $in: productIds } })
    .then(products => {
      let allProducts = [];  // Initialiser avec les produits individuels
      let total = 0;  // Initialiser le total

      // Récupérer les produits individuels et les répéter en fonction de leur quantité
      const productCount = productIds.reduce((acc, productId) => {
        acc[productId] = (acc[productId] || 0) + 1;
        return acc;
      }, {});

      // Ajouter les produits avec leur quantité dans allProducts
      products.forEach(product => {
        const quantity = productCount[product._id.toString()] || 0;
        for (let i = 0; i < quantity; i++) {
          allProducts.push(product);
        }
      });

      // Calculer le total des produits avec la fonction calculateTotal
      total += calculateTotal(allProducts);  // Utilisation de calculateTotal pour los productos
      

      // 2. Si des menus sont présents, récupérer leur prix
      if (menuIds.length > 0) {
        Menu.find({ '_id': { $in: menuIds } })
          .then(menus => {
            let menuTotal = 0;

            // Ajouter le prix des menus au total
            menus.forEach(menu => {
              menuTotal += menu.price;  // Prix total du menu
              // Ajouter l'ID du menu à la liste des produits (pas les produits à l'intérieur du menu)
              allProducts.push(menu);
            });

            // Ajouter le prix total des menus au total général
            total += menuTotal;
            

            // 3. Créer la commande
            const newOrder = new Order({
              productIds: allProducts.filter(p => p instanceof Product).map(p => p._id),  // Sauvegarder les IDs des produits
              menuIds: menuIds,  // Sauvegarder les IDs des menus
              total: total,  // Total calculé
              status: "pending"
            });

            newOrder.save()
              .then(order => res.status(201).json(order))
              .catch(error => res.status(500).json({ message: 'Erreur lors de la création de la commande', error }));
          })
          .catch(error => res.status(500).json({ message: 'Erreur lors de la récupération des menus', error }));
      } else {
        // Si aucun menu n'est sélectionné, juste les produits
        const newOrder = new Order({
          productIds: allProducts.map(p => p._id),  // Sauvegarder les IDs des produits
          total: total,  // Total calculé uniquement avec les produits
          status: "pending"
        });

        newOrder.save()
          .then(order => res.status(201).json(order))
          .catch(error => res.status(500).json({ message: 'Erreur lors de la création de la commande', error }));
      }
    })
    .catch(error => res.status(500).json({ message: 'Erreur lors de la récupération des produits', error }));
};



// Obtener todas las órdenes
exports.getAllOrders = (req, res) => {
    Order.find()
      .then(orders => res.status(200).json(orders))
      .catch(error => res.status(500).json({ message: 'Error al obtener las órdenes', error }));
  };

// Obtener una orden específica
exports.getOneOrder = (req, res) => {
    const { id } = req.params;
    Order.findById(id)
      .then(order => {
        if (!order) {
          return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json(order);
      })
      .catch(error => res.status(500).json({ message: 'Error al obtener la orden', error }));
  };


// Actualizar una orden
exports.updateOrder = (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
  
    Order.findByIdAndUpdate(id, updates, { new: true })
      .then(order => {
        if (!order) {
          return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json(order);
      })
      .catch(error => res.status(500).json({ message: 'Error al actualizar la orden', error }));
  };

// Eliminar una orden
exports.deleteOrder = (req, res) => {
    const { id } = req.params;
  
    Order.findByIdAndDelete(id)
      .then(order => {
        if (!order) {
          return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json({ message: 'Orden eliminada con éxito' });
      })
      .catch(error => res.status(500).json({ message: 'Error al eliminar la orden', error }));
  };

  exports.setPending = (req, res) => { 
    Order.findByIdAndUpdate(req.params.id, { status: 'pending' }, { new: true })
      .then(order => res.status(200).json(order))
      .catch(error => res.status(500).json({ message: 'Erreur lors de la mise à jour de l`état en Pending', error }));
  };
  
  exports.setPreparing = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, { status: 'preparing' }, { new: true })
      .then(order => res.status(200).json(order))
      .catch(error => res.status(500).json({ message: 'Erreur lors de la mise à jour de l`état en Preparing', error }));
  };
  
  exports.setCompleted = (req, res) => {
    
    Order.findByIdAndUpdate(req.params.id, { status: 'completed'  }, { new: true })
      .then(order => res.status(200).json(order))
      .catch(error => res.status(500).json({ message: 'Erreur lors de la mise à jour de l`état en Completed', error }));
  };
  exports.setDelivered = (req, res) => {
    const deliveryTime = new Date()
    Order.findByIdAndUpdate(req.params.id, { status: 'delivered', deliveryTime: deliveryTime  }, { new: true })
      .then(order => res.status(200).json(order))
      .catch(error => res.status(500).json({ message: 'Erreur lors de la mise à jour de l`état en Delivered', error }));
  };
  exports.setCancelled = (req, res) => {
    
    Order.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true })
      .then(order => res.status(200).json(order))
      .catch(error => res.status(500).json({ message: 'Erreur lors de la mise à jour de l`état en Cancelled', error }));
  };


  // Obtener las órdenes pendientes (status: "pending")
exports.getPendingOrders = (req, res) => {
    Order.find({ status: "pending" })  // Filtramos solo las órdenes con estado "pending"
      .sort({ deliveryTime: 1 })  // Ordenamos por la hora de entrega (de más temprana a más tarde)
      .then(orders => res.status(200).json(orders))  // Devolvemos las órdenes ordenadas
      .catch(error => res.status(500).json({ message: 'Error al obtener las órdenes pendientes', error }));
  };
  
  // Obtener las órdenes en preparación (status: "preparing")
  exports.getPreparingOrders = (req, res) => {
    Order.find({ status: "preparing" })  // Filtramos solo las órdenes con estado "preparing"
      .sort({ deliveryTime: 1 })  // Ordenamos por la hora de entrega (de más temprana a más tarde)
      .then(orders => res.status(200).json(orders))  // Devolvemos las órdenes ordenadas
      .catch(error => res.status(500).json({ message: 'Error al obtener las órdenes en preparación', error }));
  };
  
  // Obtener las órdenes completadas (status: "completed")
  exports.getCompletedOrders = (req, res) => {
    Order.find({ status: "completed" })  // Filtramos solo las órdenes con estado "completed"
      .sort({ deliveryTime: 1 })  // Ordenamos por la hora de entrega (de más temprana a más tarde)
      .then(orders => res.status(200).json(orders))  // Devolvemos las órdenes ordenadas
      .catch(error => res.status(500).json({ message: 'Error al obtener las órdenes completadas', error }));
  };