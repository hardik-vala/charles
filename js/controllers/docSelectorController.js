app.controller('docSelectorController', function ($scope, $modalInstance, $rootScope, $firebaseObject, $resource) {
  // TODO
  var Frankend = $resource('http://enterprise.cs.mcgill.ca:1823/:command');
  
  $scope.docNameIndexData = Frankend.query({command: 'docs'}, function() {
    $scope.selected = {nameIndex: $scope.docNameIndexData[0]};
  });

  $scope.ok = function () {
      $modalInstance.close($scope.selected.nameIndex);
  };
  
  $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
  };
    
});
