app.controller('tagController', function($scope, $modal, $log, $rootScope, $firebaseObject) {

  // TODO
  var pronouns = ['I', 'Me', 'He', 'She', 'Him', 'You', 'Himself', 'Herself', 'Myself',
    'Yourself', 'Whom', 'They', 'Them', 'Us', 'We', 'Themselves', 'Ourselves', 'Each other',
    'One another', 'One', 'Each', 'Her', 'It', 'Who', 'Any', 'Those', 'Other', 'Others',
    'Everybody'];

  var entityEquals = function(entity1, entity2) {
    return (entity1[0] == entity2[0] &&
      entity1[1] == entity2[1] &&
      entity1[2][0][0] == entity2[2][0][0] &&
      entity1[2][0][0] == entity2[2][0][0]);
  };

  var getRandomLightColor = function() {
    var letters = '3456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 13)];
    }
    return color;
  };

  // TODO: Make this accessible in other parts of the code.
  var getSpan = function(entity) {
    return $rootScope.docData.text.substring(entity[2][0][0], entity[2][0][1]).trim();
  };

  /* Returns the entity immediately succeeding the given one. */
  var nextEntity = function(entity) {
    var lastEntity = $rootScope.docData.entities.reduce(function(p, v) {
      return (p[2][0][0] > v[2][0][0]) ? p : v;
    });

    return $rootScope.docData.entities.reduce(function(p, v) {
      return (entity[2][0][0] < v[2][0][0] && v[2][0][0] < p[2][0][0]) ? v : p;
    }, lastEntity);
  };

  // Checks if the first letter of the given string is capitalized.
  var isCapitalized = function (s) { return s[0] == s[0].toUpperCase(); };

  // Checks if the given string is lowercase.
  var isLowerCase = function (s) { return s == s.toLowerCase(); };

  /* Tag the selected entity with the given tag. */
  $scope.tag = function(item) {
    if (item.type == 'ALIAS' || item.type == $rootScope.entity[1]) {
      return;
    }

    if (item.type != 'NON-CHARACTER' || item.type != 'UNRESOLVED') {
      var span = getSpan($rootScope.entity);
      
      if (isLowerCase(item.type) && isCapitalized(span) && pronouns.every(function (p) { return p != span })) {
        $rootScope.docData.entities.forEach(function (e) {
          if (e[1] == item.type) {
            e[1] = span;
          }
        });
        
        $rootScope.tagOrdering[$rootScope.tagOrdering.indexOf(item.type)] = span;
        
        item.type = span;
        item.labels = [span];
      }
    }
    
    // Set selected entity type to tag type.
    $rootScope.entity[1] = item.type;

    // Move selected tag to the beginning of the list.
    $rootScope.tagOrdering.splice($rootScope.tagOrdering.indexOf(item.type), 1);
    $rootScope.tagOrdering.unshift(item.type);

    $rootScope.entity = nextEntity($rootScope.entity);
    $rootScope.span = getSpan($rootScope.entity);
  };

  $scope.tagOnTop = function(item) {
    // TODO: Make constants of these base character types.
    if (item.type == 'ALIAS' || item.type == 'NON-CHARACTER' || item.type == 'UNRESOLVED') {
      return;
    }

    if ($rootScope.docData.entities.filter(function(entity) {
        return $rootScope.entity[2][0][0] == entity[2][0][0] && item.type == entity[1];
      }).length > 0) {
      return;
    }

    // If the selected entity has type ALIAS, then remove the entity.
    // TODO: Make a function for testing the character type of entities.
    if ($rootScope.entity[1] == 'ALIAS') {
      // TODO: Make a "removeEntity"-type function out of this code.
      $rootScope.docData.entities = $rootScope.docData.entities.filter(function(entity) {
        return !entityEquals($rootScope.entity, entity);
      });
    }

    var entityIdNumbers = $rootScope.docData.entities.map(function(entity) {
      return parseInt(entity[0].substring(1, entity[0].length));
    });

    var maxIdNumber = entityIdNumbers.reduce(function(p, v) {
      return ((p > v) ? p : v);
    });

    // Create new entity with given tag.
    var newEntity = ["T" + (maxIdNumber + 1), item.type, $rootScope.entity[2]];
    // Add new entity to the list of entities.
    $rootScope.docData.entities.push(newEntity);
    // Change selected entity to new entity.
    $rootScope.entity = newEntity;
  };

  $scope.untag = function() {
    $rootScope.docData.entities = $rootScope.docData.entities.filter(function(entity) {
      return !entityEquals($rootScope.entity, entity);
    });

    var sameSpanEntities = $rootScope.docData.entities.filter(function(e) {
      return $rootScope.entity[2][0][0] == e[2][0][0];
    });

    if (sameSpanEntities.length > 0) {
      $rootScope.entity = sameSpanEntities[0];
    }
    else {
      $rootScope.entity[1] = 'ALIAS';
      $rootScope.docData.entities.push($rootScope.entity);
    }
  };

  $scope.addNewTag = function() {
    var tagLabel = $.trim($rootScope.docData.text.substring($rootScope.entity[2][0][0], $rootScope.entity[2][0][1]));
    
    var sameTypeItems = $rootScope.characterTags.filter(function(i) {
      var leftBracketIndex = i.type.indexOf("(");
      var baseType = (leftBracketIndex > 0) ? i.type.substring(0, leftBracketIndex - 1) : i.type;
      return tagLabel == baseType;
    });
    
    if (sameTypeItems.length > 0) {
      var typeIndices = sameTypeItems.map(function (item) {
        var leftBracketIndex = item.type.indexOf("(");
        var rightBracketIndex = item.type.indexOf(")")
        return (rightBracketIndex > 0) ? parseInt(item  .type.substring(leftBracketIndex + 1, rightBracketIndex)) : 0;
      }).sort();
      
      var freeIndex = null;
      for (var i = 0; i < typeIndices.length; i++) {
        if (i != typeIndices[i]) {
          freeIndex = i;
          break;
        }
      }
      
      if (freeIndex) {
        if (freeIndex > 0) {
          tagLabel += ' (' + (freeIndex) + ')'
        }
      } else {
        tagLabel += ' (' + (typeIndices.length) + ')'
      }
    }
    
    var newTag = {
      type: tagLabel,
      labels: [tagLabel],
      bgColor: getRandomLightColor(),
      borderColor: 'darken'
    };

    $rootScope.characterTags.push(newTag);
    $rootScope.tagOrdering.push(newTag.type);
  };

  $scope.removeTag = function(item) {
    var itemIndex = $rootScope.characterTags.indexOf(item);
    if (itemIndex > -1) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'deleteTagModalContent.html',
        controller: 'deleteTagController',
        size: 'lg',
        resolve: {
          items: function () {
            return $rootScope.characterTags.filter(function (t) { return t.type != 'ALIAS' && t.type != item.type; });
          }
        }
      });
  
      modalInstance.result.then(function (selectedItem) {
        $rootScope.characterTags.splice(itemIndex, 1);
        $rootScope.tagOrdering.splice($rootScope.tagOrdering.indexOf(item.type), 1);
        
        $rootScope.docData.entities.forEach(function(entity) {
          if (entity[1] == item.type) {
            if ($rootScope.docData.entities.filter(function(e) {
                return entity[2][0][0] == e[2][0][0] && e[1] == selectedItem.type;
              }).length == 0) {
              entity[1] = selectedItem.type;
            }
          }
        });
      }, function () {});
      
      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }
  }
  
  $scope.showEntities = function(tag) {
    // TODO: Make this a controller constant.
    var windowLength = 200;
    
    var showItems = [];
    
    // TODO: Load all doc. data in the brat controller upon start.
    var allDocDataRef = new Firebase('https://blazing-heat-6025.firebaseio.com/docData');

    var allDocDataObjRef = $firebaseObject(allDocDataRef);
    allDocDataObjRef.$bindTo($scope, 'allDocData');
    
    allDocDataObjRef.$loaded(
      function (allDocData) {
        for (var i = 0; i < $rootScope.numDocuments; i++) {
          var text = allDocData[i].text;
          var entities = allDocData[i].entities;
          
          // Entities with the same type has the tag sorted in ascending order of character offsets.
          var sameTypeEntities = entities.filter(function (e) { return e[1] == tag.type; }).sort(function (e1, e2) {
            return e1[2][0][0] - e2[2][0][0];
          });
          
          sameTypeEntities.forEach(function (e) {
            showItems.push({
              docName: allDocData[i].name,
              entity: e,
              span: text.substring(e[2][0][0], e[2][0][1]),
              pretext: text.substring((e[2][0][0] - windowLength < 0) ? 0 : e[2][0][0] - windowLength, e[2][0][0]).trim(),
              posttext: text.substring(e[2][0][1] + 1, 
                (e[2][0][1] + windowLength > text.length) ? text.length : e[2][0][1] + windowLength).trim()
            });
          });
        }
        
        var modalInstance = $modal.open({
          animation: $scope.showAnimationsEnabled,
          templateUrl: 'showModalContent.html',
          controller: 'showController',
          resolve: {
            tag: function () { return tag; },
            showItems: function () { return showItems; }
          }
        });

        $scope.toggleAnimation = function () {
          $scope.showAnimationsEnabled = !$scope.showAnimationsEnabled;
        };
      },
      function(error) {
        console.error("Error:", error);
      }
    );
  }
  
});
