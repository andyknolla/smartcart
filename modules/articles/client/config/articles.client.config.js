'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Purchases',
      state: 'articles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'List Purchases',
      state: 'articles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Record Purchase',
      state: 'articles.create',
      roles: ['user']
    });


    // Add addtional menu
    // Menus.addMenuItem('categories', {
    //   title: 'Categories',
    //   state: 'categories',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // Add the dropdown list item
    // Menus.addSubMenuItem('categories', 'categories', {
    //   title: 'List categories',
    //   state: 'categories.list'
    // });

    // Add the dropdown create item
    // Menus.addSubMenuItem('categories', 'categories', {
    //   title: 'Modify Categories',
    //   state: 'categories.create',
    //   roles: ['user']
    // });
  }
]);
