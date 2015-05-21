app.controller('docSelectorController', function ($scope, $modalInstance, $rootScope, $firebaseObject) {

    $scope.docNameIndexData = [];
    $scope.selected = {
        nameIndex: {name: $rootScope.docData.name, index: $rootScope.docIndex}
    };

    // TODO: Create new data structure for holding document names and indices.
    var allDocDataRef = new Firebase('https://blazing-heat-6025.firebaseio.com/docData');
    
    var allDocDataObjRef = $firebaseObject(allDocDataRef);
    allDocDataObjRef.$bindTo($scope, 'allDocData');
    
    allDocDataObjRef.$loaded(
      function (allDocData) {
        for (var i = 0; i < $rootScope.numDocuments; i++) {
            $scope.docNameIndexData.push({name: allDocData[i].name, index: i});
        }
      },
      function(error) {
        console.error("Error:", error);
      }
    );

    $scope.ok = function () {
        $modalInstance.close($scope.selected.nameIndex);
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    
});
