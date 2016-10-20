'use strict';

// Purchases controller
angular.module('purchases').controller('PurchasesController', ['$scope', '$stateParams', '$location', '$http', '$httpParamSerializerJQLike', 'Authentication', 'Purchases', 'filepickerService',
  function ($scope, $stateParams, $location, $http, $httpParamSerializerJQLike, Authentication, Purchases, filepickerService) {
    $scope.authentication = Authentication;

    // add filepicker service
    $scope.pickFile = pickFile;

    $scope.onSuccess = onSuccess;

    function pickFile(){
      filepickerService.pick(
          {
            mimetype: 'image/*',
            imageQuality: 100
           },
          onSuccess
      );
    }
//check image quality, or validate

    function onSuccess(Blob){
      console.log(Blob.url);
      var imageUrl = Blob.url;
      $scope.imageUrl = imageUrl;
      var data = {
        apikey: 'ac22c1eaff88957',
        language: 'eng',
        url: imageUrl,
        isOverlayRequired: false
      }
      // Send image to OCR api
      $http({
        method: 'POST',
        data: $httpParamSerializerJQLike(data),
        url: 'https://api.ocr.space/parse/image',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
        console.log(response.data.ParsedResults[0].ParsedText);
          var prices = response.data.ParsedResults[0].ParsedText;
          console.log(prices.match(/[0-9]+\.[0-9][0-9](?:[^0-9]|$)/g));
           $scope.prices = prices.match(/[0-9]+\.[0-9][0-9](?:[^0-9]|$)/g);
        }, function errorCallback(response) {
          console.log(response);
        });

    }

    // function for removing price from list
      $scope.removePrice = function($index) {
        console.log($index)
        $scope.prices.splice($index,1);
      }



    // Create new Purchase
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'purchaseForm');

        return false;
      }
console.log($scope.category)
      // Create new Purchase object
      var purchase = new Purchases({
        name: this.name,
        category: this.category,
        price: this.price,
        date: this.date
      });

      // Redirect after save
      purchase.$save(function (response) {
        $location.path('purchases/' + response._id);
      //  console.log(purchase);

        // Clear form fields
        $scope.name = '';
        $scope.category = '';
        $scope.price = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Purchase
    $scope.remove = function (purchase) {
      if (purchase) {
        purchase.$remove();

        for (var i in $scope.purchases) {
          if ($scope.purchases[i] === purchase) {
            $scope.purchases.splice(i, 1);
          }
        }
      } else {
        $scope.purchase.$remove(function () {
          $location.path('purchases');
        });
      }
    };

    // Update existing Purchase
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'purchaseForm');

        return false;
      }

      var purchase = $scope.purchase;

      purchase.$update(function () {
        $location.path('purchases/' + purchase._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Purchases
    $scope.find = function () {
      $scope.purchases = Purchases.query();
    };

    // Find existing Purchase
    $scope.findOne = function () {
      $scope.purchase = Purchases.get({
        purchaseId: $stateParams.purchaseId
      });
    };
  }
]);
