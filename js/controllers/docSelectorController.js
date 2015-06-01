app.controller('docSelectorController', function ($scope, $modalInstance, $rootScope, $firebaseObject) {

  $scope.docNameIndexData = [];

  for (var i = 0; i < $rootScope.numDocs; i++)
    $scope.docNameIndexData.push({name: $rootScope.docsData[i].name, index: i});

  $scope.selected = {
    nameIndex: $scope.docNameIndexData[0]
  };

  $scope.ok = function () {
      $modalInstance.close($scope.selected.nameIndex);
  };
  
  $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
  };
    
});
