'use strict';

// Configuring the Purchases module
angular.module('purchases').run(['Menus',
  function (Menus) {
    // Add the purchases dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Purchases',
      state: 'purchases',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'purchases', {
      title: 'List Purchases',
      state: 'purchases.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'purchases', {
      title: 'Record Purchase',
      state: 'purchases.create',
      roles: ['user']
    });
  }
]);
