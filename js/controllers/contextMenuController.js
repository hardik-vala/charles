app.controller('contextMenuController', function($scope, $rootScope) {

    $scope.menuOptions = [
        ['Show Tagged Instances', function ($itemScope) {
            $rootScope.showEntities($itemScope.tag);
        }],
        null, // Divider
        ['Delete & Replace', function ($itemScope) {
            $rootScope.removeTag($itemScope.tag);
        }]
    ];
    
});
