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

  $scope.motion = {
    alpha: 0,
    beta: 0,
    gamma: 0
  }

  function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    $scope.$apply(function(){
      $scope.motion.alpha = alpha;
      $scope.motion.beta = beta;
      $scope.motion.gamma = gamma;
    })
  }

  $window.addEventListener('deviceorientation', handleOrientation);



  $scope.init();

}
