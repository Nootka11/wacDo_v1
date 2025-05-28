const Order = require('../models/Order');
const Product = require('../models/Product');
const Menu = require('../models/Menu');
const { calculateTotal } = require('../utils/orderUtils');
const { countItems } = require('../utils/countItems');

// Créer une commande
exports.createOrder = async (req, res) => {
  const { productIds = [], menuIds = [] } = req.body;

  try {
    // 1. Récupération des produits
    const products = await Product.find({ _id: { $in: productIds } });
    const productCount = countItems(productIds);
    let allProducts = [];

    products.forEach(product => {
      const quantity = productCount[product._id.toString()] || 0;
      for (let i = 0; i < quantity; i++) {
        allProducts.push(product);
      }
    });

    let total = calculateTotal(allProducts);

    // 2. Récupération des menus
    if (menuIds.length > 0) {
      const menus = await Menu.find({ _id: { $in: menuIds } });
      const menuCount = countItems(menuIds);

      menus.forEach(menu => {
        const quantity = menuCount[menu._id.toString()] || 1;
        for (let i = 0; i < quantity; i++) {
          allProducts.push(menu);
          total += menu.price;
        }
      });
    }

    // 3. Création et sauvegarde de la commande
    const newOrder = new Order({
      productIds: allProducts.filter(p => p instanceof Product).map(p => p._id),
      menuIds,
      total,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
  }
};

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
  }
};

// Récupérer une commande spécifique
exports.getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error });
  }
};

// Mettre à jour une commande
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Commande non trouvée' });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
  }
};

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Commande non trouvée' });
    res.status(200).json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
  }
};

// Fonctions pour changer l’état d’une commande
const updateOrderStatus = (status, extraFields = {}) => async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, ...extraFields },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la mise à jour de l'état en ${status}`, error });
  }
};

exports.setPending = updateOrderStatus('pending');
exports.setPreparing = updateOrderStatus('preparing');
exports.setCompleted = updateOrderStatus('completed');
exports.setCancelled = updateOrderStatus('cancelled');
exports.setDelivered = updateOrderStatus('delivered', { deliveryTime: new Date() });
