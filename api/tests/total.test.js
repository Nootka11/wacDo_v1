const { calculateTotal } = require('../utils/orderUtils');

describe('calculateTotal', () => {
  test('should return 0 for empty product array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('should calculate total for one product', () => {
    const products = [{ price: 5.5 }];
    expect(calculateTotal(products)).toBe(5.5);
  });

  test('should calculate total for multiple products', () => {
    const products = [
      { price: 3.0 },
      { price: 2.5 },
      { price: 4.5 }
    ];
    expect(calculateTotal(products)).toBe(10.0);
  });

  test('should handle prices with decimals correctly', () => {
    const products = [
      { price: 1.99 },
      { price: 2.01 }
    ];
    expect(calculateTotal(products)).toBeCloseTo(4.0);
  });
});


