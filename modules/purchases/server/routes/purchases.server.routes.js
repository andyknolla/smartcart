'use strict';

/**
 * Module dependencies.
 */
var purchasesPolicy = require('../policies/purchases.server.policy'),
  purchases = require('../controllers/purchases.server.controller');

module.exports = function (app) {
  // Purchases collection routes
  app.route('/api/purchases').all(purchasesPolicy.isAllowed)
    .get(purchases.list)
    .post(purchases.create);

  // Single purchase routes
  app.route('/api/purchases/:purchaseId').all(purchasesPolicy.isAllowed)
    .get(purchases.read)
    .put(purchases.update)
    .delete(purchases.delete);

  // Finish by binding the purchase middleware
  app.param('purchaseId', purchases.purchaseByID);
};
