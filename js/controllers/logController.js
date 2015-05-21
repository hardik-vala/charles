app.controller('logController', function($scope, $log, $rootScope, $firebaseArray) {
  var logRef = new Firebase('https://blazing-heat-6025.firebaseio.com/log');

  $scope.messages = $firebaseArray(logRef);
  
  // add new items to the array
  // the message is automatically added to Firebase!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
  };
});