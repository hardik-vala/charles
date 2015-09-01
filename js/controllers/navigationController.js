app.controller('navigationController', function($scope, $log, $modal, $rootScope, $resource) {

  // TODO
  var Frankend = $resource('http://enterprise.cs.mcgill.ca:1823/:command');
  
  $scope.docNameIndexData = Frankend.query({command: 'docs'}, function() {});

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
    if ($rootScope.docIndex < $scope.docNameIndexData.length - 1) {
      document.location = "?doc=" + ($rootScope.docIndex + 1);
    }
  };
  
});
