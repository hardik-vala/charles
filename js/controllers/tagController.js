app.controller('tagController', function($scope, $modal, $log, $rootScope, $firebaseObject, $resource) {

  // TODO
  var pronouns = ['I', 'Me', 'He', 'She', 'Him', 'You', 'Himself', 'Herself', 'Myself',
    'Yourself', 'Whom', 'They', 'Them', 'Us', 'We', 'Themselves', 'Ourselves', 'Each other',
    'One another', 'One', 'Each', 'Her', 'It', 'Who', 'Any', 'Those', 'Other', 'Others',
    'Everybody'];

  var getRandomLightColor = function() {
    var letters = '56789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 11)];
    }
    return color;
  };

  // Returns the span for the given entity in the text.
  var getSpan = function(entity) {
    return getEntitySpan($rootScope.docData.text, entity);
  };

  // Checks if the first letter of the given string is capitalized.
  var isCapitalized = function (s) { return s[0] == s[0].toUpperCase(); };

  // Checks if the given string is lowercase.
  var isLowerCase = function (s) { return s == s.toLowerCase(); };
  
  this.isCharacterTag = isCharacterTag;
  
  /* Tags the selected entity with the given tag. */
  $scope.setTag = function (tag) {
    if (isAliasTag(tag) || hasType($rootScope.selectedEntity, tag.type))
      return;

    var sameOffsetEntities = getSameOffsetEntities($rootScope.taggedEntities, $rootScope.selectedEntity);
  
    if (hasType(sameOffsetEntities, TagInfo.nonCharacter.name))
      return;

    if (sameOffsetEntities.length > 1 && isNonCharacterTag(tag))
      return;

    // If the selected entity has type ALIAS, then remove the entity from the
    // list of tagged entities.
    if (hasAliasType($rootScope.selectedEntity)) {
      $rootScope.taggedEntities = removeEntity($rootScope.taggedEntities, $rootScope.selectedEntity);
      $rootScope.docData.entities = removeEntity($rootScope.docData.entities, $rootScope.selectedEntity);
    }
     
    var newEntityIdNumber = getNewEntityIdNumber($rootScope.taggedEntities);

    // Create new entity with given tag.
    var newEntity = ["T" + newEntityIdNumber, tag.type, $rootScope.selectedEntity[CHAR_OFFSETS_IND]];
    // Add new entity to the list of entities.
    $rootScope.taggedEntities.push(newEntity);
    $rootScope.docData.entities.push(newEntity);
    // Sort the list of entities.
    $rootScope.taggedEntities = sortTaggedEntities($rootScope.taggedEntities);
    // Change selected entity to new entity.
    $rootScope.selectedEntity = newEntity;
    // TODO: Change this to update through a watcher.
    $rootScope.span = getSpan($rootScope.selectedEntity);
    // TODO: Change this to update through a watcher.
    $rootScope.taggedEntityIndex = findTaggedEntityIndex($rootScope.taggedEntities, $rootScope.selectedEntity);
    
    // Move selected tag to the beginning of the list if it's a character tag.
    if (isCharacterTag(tag)) {
      $rootScope.tagOrdering.splice($rootScope.tagOrdering.indexOf(tag.type), 1);
      $rootScope.tagOrdering.unshift(tag.type); 
    }
  };

  $scope.changeTag = function (tag) {
    if (isAliasTag(tag) || hasType($rootScope.selectedEntity, tag.type))
      return;

    if ($rootScope.taggedEntities.filter(function(e) {
        return $rootScope.selectedEntity[2][0][0] == e[2][0][0] && tag.type == e[1];
      }).length > 0) {
      return;
    }

    $rootScope.taggedEntities = removeEntity($rootScope.taggedEntities, $rootScope.selectedEntity);
    $rootScope.docData.entities = removeEntity($rootScope.docData.entities, $rootScope.selectedEntity);

    $scope.setTag(tag);
  };

  $scope.untag = function() {
    $rootScope.taggedEntities = removeEntity($rootScope.taggedEntities, $rootScope.selectedEntity);
    $rootScope.docData.entities = removeEntity($rootScope.docData.entities, $rootScope.selectedEntity);
    
    var sameOffsetEntities = getSameOffsetEntities($rootScope.taggedEntities, $rootScope.selectedEntity);

    if (sameOffsetEntities.length > 0)
      $rootScope.selectedEntity = sameOffsetEntities[0];
    else {
      $rootScope.selectedEntity[TYPE_IND] = TagInfo.alias.name;
      $rootScope.docData.entities.push($rootScope.selectedEntity);
      $rootScope.taggedEntities.push($rootScope.selectedEntity);
      // Sort the list of entities.
      $rootScope.taggedEntities = sortTaggedEntities($rootScope.taggedEntities);
    }
  };

  $scope.addNewTag = function() {
    var tagName = getSpan($rootScope.selectedEntity);
    
    var sameTypeTags = $rootScope.collData.entity_types.filter(function(i) {
      var leftBracketIndex = i.type.indexOf("(");
      var baseType = (leftBracketIndex > 0) ? i.type.substring(0, leftBracketIndex - 1) : i.type;
      return tagName == baseType;
    });
    
    if (sameTypeTags.length > 0) {
      var typeIndices = sameTypeTags.map(function (tag) {
        var leftBracketIndex = tag.type.indexOf("(");
        var rightBracketIndex = tag.type.indexOf(")")
        return (rightBracketIndex > 0) ? parseInt(tag.type.substring(leftBracketIndex + 1, rightBracketIndex)) : 0;
      }).sort();
      
      var freeIndex = null;
      for (var i = 0; i < typeIndices.length; i++) {
        if (i != typeIndices[i]) {
          freeIndex = i;
          break;
        }
      }
      
      if (freeIndex) {
        if (freeIndex > 0)
          tagName += ' (' + (freeIndex) + ')'
      } else
        tagName += ' (' + (typeIndices.length) + ')'
    }
    
    var newTag = {
      type: tagName,
      labels: [tagName],
      bgColor: getRandomLightColor(),
      borderColor: 'darken'
    };

    $rootScope.collData.entity_types.push(newTag);
    $rootScope.tagOrdering.push(newTag.type);
    
    // Changes the tag for the selected instance to the new tag.
    $scope.changeTag(newTag);
  };


  $rootScope.removeTag = function(tag) {
    var Frankend = $resource('http://enterprise.cs.mcgill.ca:1823/:command');
    
    var tagIndex = $rootScope.collData.entity_types.indexOf(tag);
    if (tagIndex > -1) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'deleteTagModalContent.html',
        controller: 'deleteTagController',
        size: 'lg',
        resolve: {
          items: function () {
            return $rootScope.collData.entity_types.filter(function (t) { return !isAliasTag(t) && t.type != tag.type; });
          }
        }
      });
  
      modalInstance.result.then(function(selectedTag) {
        var replaceResult = Frankend.get({
          command: 'replace',
          old_character: tag.type,
          replacement_character: selectedTag.type
        }, function() {
          $rootScope.collData.entity_types.splice(tagIndex, 1);
          $rootScope.tagOrdering.splice($rootScope.tagOrdering.indexOf(tag.type), 1);
        });
      });
        
      //   $rootScope.taggedEntities.forEach(function(entity) {
      //     if (entity[1] == tag.type) {
      //       if ($rootScope.taggedEntities.filter(function(e) {
      //           return entity[2][0][0] == e[2][0][0] && e[1] == selectedTag.type;
      //         }).length == 0) {
      //         entity[1] = selectedTag.type;
      //       }
      //     }
      //   });
        
      //   for (var i = 0; i < $rootScope.numDocs; i++) {
      //     var entitiesToRemove = [];
          
      //     $rootScope.docData.entities.forEach(function(entity) {
      //       if (entity[1] == tag.type) {
      //         if ($rootScope.docData.entities.filter(function(e) {
      //             return entity[2][0][0] == e[2][0][0] && e[1] == selectedTag.type;
      //           }).length == 0) {
      //           entity[1] = selectedTag.type;
      //         } else
      //           entitiesToRemove.push(entity);
      //       }
      //     });
          
      //     entitiesToRemove.forEach(function (entity) {
      //       $rootScope.taggedEntities = removeEntity($rootScope.taggedEntities, entity);
      //       $rootScope.doc
      //       Data.entities = removeEntity($rootScope.docData.entities, entity);
      //     });
          
      //   };
      // }, function () {});
      
      // $scope.toggleAnimation = function () {
      //   $scope.animationsEnabled = !$scope.animationsEnabled;
      // };
    }
  }
  
  $rootScope.showEntities = function(tag) {
    var Frankend = $resource('http://enterprise.cs.mcgill.ca:1823/:command');
    var showItems = Frankend.query({
      command: 'show',
      character: tag.type
    }, function() {
      var modalInstance = $modal.open({
        animation: $scope.showAnimationsEnabled,
        templateUrl: 'showModalContent.html',
        controller: 'showController',
        resolve: {
          tag: function() {
            return tag;
          },
          showItems: function() {
            return showItems;
          }
        }
      });

      $scope.toggleAnimation = function() {
        $scope.showAnimationsEnabled = !$scope.showAnimationsEnabled;
      };
    });
  }
  
  
  // TODO: Persist
  $scope.groupTags = [];
  
  $scope.showGroupTagBuilder = function() {
    var modalInstance = $modal.open({
      animation: $scope.showAnimationsEnabled,
      templateUrl: 'groupTagBuilderModalContent.html',
      controller: 'groupTagController',
      resolve: {
          tags: function() {
              return $rootScope.collData.entity_types;
          }
      }
    });
    modalInstance.result.then(function(group) {
      $scope.groupTags.push(group);
    });
  };
  
  $scope.setGroupTag = function(tags) {
    tags.forEach($scope.setTag);
  };
  
});
