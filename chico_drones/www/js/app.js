// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('chico-drones', ['ionic'])

  .run(['$ionicPlatform', '$rootScope', function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }



    });
  }])


angular.module('chico-drones', []);

angular.module('chico-drones')
  .controller('appController', ['$scope', '$window', appController]);

function appController($scope, $window) {
  $scope.init = function () {
    $scope.title = "Motion Testing"
  }


  $scope.url = "https://";

  $scope.alphaLock = 0;
  $scope.newAlpha = 0;
  $scope.motion = {
    alpha: 0,
    beta: 0,
    gamma: 0
  }

  $scope.lock = function () {
    $scope.alphaLock = ($scope.motion.alpha);
    console.log($scope.url);
  }

  function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    $scope.$apply(function () {
      $scope.motion.alpha = (alpha ? alpha.toFixed(3) : 0);
      $scope.motion.beta = beta ? beta.toFixed(3) : 0;
      $scope.motion.gamma = gamma ? gamma.toFixed(3) : 0;
      $scope.newAlpha = ($scope.motion.alpha - $scope.alphaLock)
    })

    log($scope.motion.alpha, $scope.motion.beta, $scope.motion.gamma);
  }

  var lastMove = 0;
  function log(alpha, beta, gamma) {

    if (Date.now() - lastMove > 2000) {
      var url = `${$scope.url}?alpha=${alpha}&beta=${beta}&gamma=${gamma}`;
      //var params = `alpha=${alpha}&beta=${beta}&gamma${gamma}`;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);

      //Send the proper header information along with the request
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.send();
      lastMove = Date.now();
    }


  }

  $window.addEventListener('deviceorientation', handleOrientation);



  $scope.init();

}
