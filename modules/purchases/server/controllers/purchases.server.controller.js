'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Purchase = mongoose.model('Purchase'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a purchase
 */
exports.create = function (req, res) {
  var purchase = new Purchase(req.body);
  purchase.user = req.user;

  purchase.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(purchase);
    }
  });
};

/**
 * Show the current purchase
 */
exports.read = function (req, res) {
  res.json(req.purchase);
};

/**
 * Update a purchase
 */
exports.update = function (req, res) {
  var purchase = req.purchase;

  purchase.title = req.body.title;
  purchase.content = req.body.content;
  purchase.ticklist = req.body.ticklist;

  purchase.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(purchase);
    }
  });
};

/**
 * Delete an purchase
 */
exports.delete = function (req, res) {
  var purchase = req.purchase;

  purchase.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(purchase);
    }
  });
};

/**
 * List of Purchases
 */
exports.list = function (req, res) {
  Purchase.find().sort('-created').populate('user', 'displayName').exec(function (err, purchases) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(purchases);
    }
  });
};

/**
 * Purchase middleware
 */
exports.purchaseByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Purchase is invalid'
    });
  }

  Purchase.findById(id).populate('user', 'displayName').exec(function (err, purchase) {
    if (err) {
      return next(err);
    } else if (!purchase) {
      return res.status(404).send({
        message: 'No purchase with that identifier has been found'
      });
    }
    req.purchase = purchase;
    next();
  });
};
