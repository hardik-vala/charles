app.controller('groupTagController', function($scope, $modalInstance, tags) {
    $scope.tags = tags.filter(isCharacterTag);
    
    $scope.group = {}
    $scope.group.name = '';
    $scope.group.tags = [];
    
    $scope.ok = function () {
      
    $modalInstance.close({name: $scope.group.name, tags: $scope.group.tags.map(function(selected) {
      return {type:selected.type,bgColor:selected.bgColor,labels:selected.labels,borderColor:selected.borderColor};
    })});
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
});