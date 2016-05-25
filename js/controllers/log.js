app.controller('logController', function($scope, $log, $rootScope, $firebaseArray, ConfigService) {
  var logRef = new Firebase(ConfigService.getFBLink() + '/log');

  $scope.messages = $firebaseArray(logRef);
  
  // add new items to the array
  // the message is automatically added to Firebase!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
  };
});
