const request = require('supertest');
const app = require('../app'); // tu archivo Express
const mongoose = require('mongoose');

describe('GET /api/products', () => {
  it('devrait renvoyer un tableau de produits', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /api/orders/create-order', () => {
    it('devrait créer une nouvelle commande correctement', async () => {
      // Simula productos o menús válidos existentes (IDs válidos de tu base de datos)
      const token = 'TOKEN'; // Reemplaza con uno real si tienes auth
      const res = await request(app)
        .post('/api/orders/create-order')
        .set('Authorization', `Bearer ${token}`)
        .send({
          productIds: ['67f7d5aeabf4fb3934a0bfe9'],
          menuIds: ['67f6876b291d82459266a88d']
        });
  
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('total');
      expect(res.body.status).toBe('pending');
    });
  });
