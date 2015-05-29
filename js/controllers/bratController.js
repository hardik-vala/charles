app.controller('bratController', function($scope, $log, $rootScope, $firebaseObject) {
  
  // TODO: Retrieve this value from Firebase.
  $rootScope.numDocuments = 3;
  
  // Keycode for selecting previous instance ('a').
  $scope.prevTaggedKeyCode = 97;
  // Keycode for selecting next instance ('d').
  $scope.nextTaggedKeyCode = 100;
  
  // Returns the span for the given entity from the text that's loaded.
  var getSpan = function (entity) {
    return getEntitySpan($rootScope.docData.text, entity);
  };
  
  /* Index of document (in document data) to display. */
  $rootScope.docIndex = parseInt(getQueryVariable("doc") || "0");
  
  var collDataRef = new Firebase(FB.link + '/collData');
  var docDataRef = new Firebase(FB.link + '/docData/'+ $rootScope.docIndex);

  var collDataObjRef = $firebaseObject(collDataRef)
  collDataObjRef.$bindTo($rootScope, 'collData');
  var docDataObjRef = $firebaseObject(docDataRef);
  docDataObjRef.$bindTo($rootScope, 'docData');
  
  collDataObjRef.$loaded(
    function(collData) {
      docDataObjRef.$loaded(function(docData) {

          head.ready(function() {
            var liveDiv = $('#brat-view');

            // Hook into the dispatcher.
            var liveDispatcher = Util.embed('brat-view',
              $.extend({
                'collection': null
              }, collData),
              $.extend({}, docData), webFontURLs);

            var renderError = function() {
              // liveDiv.css({'border': '2px solid red'}); // Setting this blows the layout.
            };

            liveDispatcher.on('renderError: Fatal', renderError);
            liveDispatcher.on('doneRendering', $scope.findVisual);

            $rootScope.taggedEntities = sortTaggedEntities(docData.entities);

            // DECPRECATED
            $rootScope.entity = firstTaggedEntity($rootScope.taggedEntities);
            $rootScope.selectedEntity = firstTaggedEntity($rootScope.taggedEntities);
            $rootScope.taggedEntityIndex = 0;
            $rootScope.span = getSpan($rootScope.selectedEntity);
            
            /* Tags that refer specifically to a character. */
            $rootScope.characterTags = $rootScope.collData.entity_types.filter(function (tag) {
              return isCharacterTag(tag);
            });
            
            /* Tags that don't refer specifically to a character. */
            $rootScope.nonCharacterTags = $rootScope.collData.entity_types.filter(function (tag) {
              return !isCharacterTag(tag);
            });

            /* Non-character tags that can be used as tags. */
            $rootScope.taggableNonCharacterTags = $rootScope.nonCharacterTags.filter(function (tag) {
              return !isAliasTag(tag);
            });
            
            $rootScope.tagOrdering = $rootScope.characterTags.map(function (tag) { return tag.type; });
            $scope.selectedVisualElement = $scope.findVisual;
            $rootScope.aliasesRemaining = countAliases($rootScope.taggedEntities);
            
            $rootScope.unresolvedsRemaining = countUnresolveds($rootScope.taggedEntities);

            docDataObjRef.$watch(function() {
              $rootScope.aliasesRemaining = countAliases($rootScope.taggedEntities);
              $rootScope.unresolvedsRemaining = countUnresolveds($rootScope.taggedEntities);
            });

            collDataObjRef.$watch(function() {
              liveDispatcher.post('collectionLoaded', [$.extend({
                'collection': null
              }, $rootScope.collData)]);
            });

            docDataObjRef.$watch(function() {
              liveDispatcher.post('requestRenderData', [$.extend({}, $rootScope.docData)]);
            });
          })
        },
        function(error) {
          console.error("Error:", error);
        })
    },
    function(error) {
      console.error("Error:", error);
    }
  );

  $scope.applySelectionStyle = function (element) {
    element.style.strokeWidth = '4';
  };
  
  $scope.unapplySelectionStyle = function (element) {
    if (element && element.style && element.style.strokeWidth)
      element.style.strokeWidth = '';
  };

  $scope.findVisual = function() {
    $.find('rect').forEach(function(srcElement) {
      if (srcElement.attributes && srcElement.attributes.class && srcElement.attributes.class.nodeValue.indexOf("span") > -1) {
        for (attribute in srcElement.attributes) {
          if (srcElement.attributes[attribute].nodeName == 'data-span-id') {
            id = srcElement.attributes[attribute].value
            if ($rootScope.selectedEntity && $rootScope.selectedEntity[0] == id) {
              $scope.applySelectionStyle(srcElement);
              $scope.selectedVisualElement = srcElement;
            }
          }
        }
      }
    });
  }

  $scope.unselect = function() {
    if ($scope.selectedVisualElement) {
      $scope.unapplySelectionStyle($scope.selectedVisualElement);
    }
    $scope.selectedVisualElement = null;
    $rootScope.selectedEntity = null;
    $rootScope.span = null;
  }

  $rootScope.selectEntity = function(e) {
    if (e.srcElement.nodeName == 'rect' && e.srcElement.attributes.class.nodeValue.indexOf("span") > -1) {
      $scope.unselect();
      for (var attribute in e.srcElement.attributes) {
        if (e.srcElement.attributes[attribute].nodeName == 'data-span-id') {
          $scope.selectedVisualElement = e.srcElement;
          var id = e.srcElement.attributes[attribute].value;
          $rootScope.docData['entities'].forEach(function(entity) {
            if (entity[0] == id) {
              // $scope.unselect();
              
              $rootScope.collData.entity_types.forEach(function(item) {
                if (item.type == entity[1]) {
                  $rootScope.selectedEntity = entity;
                  $rootScope.span = getSpan(entity);
                  $rootScope.taggedEntityIndex = findTaggedEntityIndex($rootScope.taggedEntities, $rootScope.selectedEntity);
                }
              });
              
              $scope.applySelectionStyle(e.srcElement);
            }
          });
        }
      }
    }
    else {
      return;
    }
  };
  
  // Moves to the tagged entity immediately preceding the selected one.
  var toPrevTaggedEntity = function () {
    $scope.unselect();
    
    $rootScope.taggedEntityIndex--;
    $rootScope.selectedEntity = $rootScope.taggedEntities[$rootScope.taggedEntityIndex];
    $rootScope.span = getSpan($rootScope.selectedEntity);
    
    $scope.findVisual();
  }
  
  // Moves to the tagged entity immediately succeeding the selected one.
  var toNextTaggedEntity = function () {
    $scope.unselect();
    
    $rootScope.taggedEntityIndex++;
    $rootScope.selectedEntity = $rootScope.taggedEntities[$rootScope.taggedEntityIndex];
    $rootScope.span = getSpan($rootScope.selectedEntity);
    
    $scope.findVisual();
  }
  
  // Moves to either the immediately preceding or succeeding tagged entity
  // relative to the selected one based on the specific key pres.
  $scope.nextSelection = function ($event) {
    if ($rootScope.selectedEntity) {
      if($event.keyCode == $scope.prevTaggedKeyCode) {
        if ($rootScope.taggedEntityIndex > 0) {
          toPrevTaggedEntity();
        }
      } else if ($event.keyCode == $scope.nextTaggedKeyCode) {
        if ($rootScope.taggedEntityIndex < $rootScope.taggedEntities.length - 1) {
          toNextTaggedEntity();
        }
      } 
    }
  };
  
});

app.filter('tagOrderFilter', function ($rootScope) {
  return function (tags) {
    if ($rootScope.tagOrdering) {
      var untrackedTags = tags.filter(function (t) { return $rootScope.tagOrdering.indexOf(t.type) == -1; });
      var orderedTrackedTags = $rootScope.tagOrdering.map(function (type) {
        return tags.filter(function (t) { return t.type == type; })[0];
      });
      return orderedTrackedTags.concat(untrackedTags);
    } else {
      return tags;
    }
  };
});
