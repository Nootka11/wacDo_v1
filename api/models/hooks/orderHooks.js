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

      const lastOrder = await Order.findOne({
        reference: new RegExp(`^${key}-[A-Z]\\d{3}$`)
      }).sort({ createdAt: -1 });
      // console.log('last order.reference', lastOrder ? lastOrder.reference : 'No previous order')

      let nextLetter = 'A';
      let nextNum = 1;

      if (lastOrder && lastOrder.reference) {
        const match = lastOrder.reference.match(/-([A-Z])(\d{3})$/);
        if (match) {
          const [_, letter, numStr] = match;
          const num = parseInt(numStr, 10);

          if (num >= 999) {
            nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
            nextNum = 1;
          } else {
            nextLetter = letter;
            nextNum = num + 1;
          }
        }
      }

      const paddedNum = nextNum.toString().padStart(3, '0');
      this.reference = `${key}-${nextLetter}${paddedNum}`;
    }
    next();
  });
};
