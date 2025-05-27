module.exports = function applyOrderHooks(orderSchema) {
  orderSchema.pre('save', async function (next) {
    if (this.isNew && !this.reference) {
      const now = new Date();
      const day = now.getDay();
      const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
      const dayLetter = dayNames[day];
      const date = now.getDate();
      const key = `${dayLetter}${date}`;

      const Order = this.constructor;
      const countToday = await Order.countDocuments({
        createdAt: {
          $gte: new Date(now.setHours(0, 0, 0, 0)),
          $lt: new Date(now.setHours(23, 59, 59, 999))
        }
      });

      const letter = 'A';
      const num = (countToday + 1).toString().padStart(3, '0');

      this.reference = `${key}-${letter}${num}`;
    }
    next();
  });
};
