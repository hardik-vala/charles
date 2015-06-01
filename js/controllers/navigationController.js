app.controller('navigationController', function($scope, $log, $modal, $rootScope) {

  $scope.selectDoc = function () {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'docSelectorModalContent.html',
      controller: 'docSelectorController',
      // size: 'lg',
      resolve: {}
    });

    modalInstance.result.then(function (nameIndex) {
      document.location = "?doc=" + nameIndex.index;
    }, function () {});
    
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  }

  $scope.previousDoc = function () {
    if ($rootScope.docIndex > 0) {
      document.location = "?doc=" + ($rootScope.docIndex - 1);
    }
  };

  $scope.nextDoc = function () {
    if ($rootScope.docIndex < $rootScope.numDocs - 1) {
      document.location = "?doc=" + ($rootScope.docIndex + 1);
    }
  };
  
});
