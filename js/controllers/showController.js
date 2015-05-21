app.controller('showController', function ($scope, $modalInstance, tag, showItems) {
  
  $scope.tag = tag;
  $scope.showItems = showItems;

  $scope.close = function () {
    $modalInstance.close();
  };

//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };
    $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function(showItem) {
    var newWidth = 868 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      docName: showItem.docName,
      pretext: showItem.pretext,
      span: showItem.span,
      posttext: showItem.posttext
    });
  };
  
  $scope.showItems.forEach(function(showItem) {
    $scope.addSlide(showItem)
  })

});
