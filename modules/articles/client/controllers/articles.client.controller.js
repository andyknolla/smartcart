'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$http', '$httpParamSerializerJQLike', 'Authentication', 'Articles', 'filepickerService',
  function ($scope, $stateParams, $location, $http, $httpParamSerializerJQLike, Authentication, Articles, filepickerService) {
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



    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var article = new Articles({
        name: this.name,
        category: this.category,
        price: this.price,
        date: this.date
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.category = '';
        $scope.price = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
  }
]);
