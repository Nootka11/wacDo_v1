// utils/orderUtils.js
exports.calculateTotal = (products) => {
    return products.reduce((sum, product) => sum + product.price, 0);
  };
  