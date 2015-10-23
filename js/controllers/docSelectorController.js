app.controller('docSelectorController', function ($scope, $modalInstance, $rootScope, $firebaseObject, $resource) {
  // TODO
<<<<<<< HEAD
  // var Frankend = $resource('https://frankend-elwebmaster-1.c9.io/:command');
  var Frankend = $resource('http://enterprise.cs.mcgill.ca:1824/:command');
=======
  var Frankend = $resource('http://enterprise.cs.mcgill.ca:1823/:command');
>>>>>>> 044861c62d5bda8301a8ea0a8f07055f27073aba
  
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
