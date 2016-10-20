'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Purchase Schema
 */
var PurchaseSchema = new Schema({
  date: {
    type: Date,
    default: ''
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    default: '',
    trim: true
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Purchase', PurchaseSchema);
