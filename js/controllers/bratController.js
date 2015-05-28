app.controller('bratController', function($scope, $log, $rootScope, $firebaseObject) {
  
  // TODO: Retrieve this value from Firebase.
  $rootScope.numDocuments = 3;
  
  // Index of document (in document data) to display.
  $rootScope.docIndex = parseInt(getQueryVariable("doc") || "0");
  
  var collDataRef = new Firebase(FB.link + '/collData');
  var docDataRef = new Firebase(FB.link + '/docData/'+ $rootScope.docIndex);

  var collDataObjRef = $firebaseObject(collDataRef)
  collDataObjRef.$bindTo($rootScope, 'collData');
  var docDataObjRef = $firebaseObject(docDataRef);
  docDataObjRef.$bindTo($rootScope, 'docData');
  
  $scope.findVisual = function() {
    $.find('rect').forEach(function(srcElement) {
      if (srcElement.attributes && srcElement.attributes.class && srcElement.attributes.class.nodeValue.indexOf("span") > -1) {
        for (attribute in srcElement.attributes) {
          if (srcElement.attributes[attribute].nodeName == 'data-span-id') {
            id = srcElement.attributes[attribute].value
            if ($rootScope.entity[0] == id) {
              srcElement.style.strokeWidth = "5";
              $rootScope.visualElement = srcElement;
            }
          }
        }
      }
    });
  }

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

            $rootScope.entity = getFirstEntity();
            $rootScope.span = getSpan($rootScope.entity);
            $rootScope.tags = $rootScope.collData.entity_types;
            
            /* Tags that don't refer specifically to a character. */
            $rootScope.nonCharacterTags = $rootScope.tags.filter(function (tag) {
              return !isCharacterTag(tag)
            });
            
            /* Non-character tags that can be used as tags. */
            $rootScope.taggableNonCharacterTags = $rootScope.nonCharacterTags.filter(function (tag) {
              return !isAliasTag(tag);
            });
            
            $rootScope.tagOrdering = $rootScope.tags.map(function (tag) { return tag.type; });
            $rootScope.visualElement = $scope.findVisual;
            $rootScope.aliasesRemaining = $rootScope.docData.entities.filter(function(e) {
                return e[1] == 'ALIAS';
              }).length;

            docDataObjRef.$watch(function() {
              $rootScope.aliasesRemaining = $rootScope.docData.entities.filter(function(e) {
                return e[1] == 'ALIAS';
              }).length;
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

  var getFirstEntity = function() {
    return $rootScope.docData.entities.reduce(function(p, v) {
      return ((p[2][0][0] < v[2][0][0]) ? p : v);
    });
  };

  // TODO: Make this accessible in other parts of the code.
  var getSpan = function(entity) {
    return $rootScope.docData.text.substring(entity[2][0][0], entity[2][0][1]);
  };

  var unselect = function() {
    if ($rootScope.visualElement != '') {
      $rootScope.visualElement.style.strokeWidth = "";
    }
    $rootScope.visualElement = '';
    $rootScope.entity = '';
    $rootScope.span ='';
  }

  $rootScope.select = function(e) {
    unselect();
    if (e.srcElement.nodeName == 'rect' && e.srcElement.attributes.class.nodeValue.indexOf("span") > -1) {
      for (attribute in e.srcElement.attributes) {
        if (e.srcElement.attributes[attribute].nodeName == 'data-span-id') {
          $rootScope.visualElement = e.srcElement;
          id = e.srcElement.attributes[attribute].value
          $rootScope.docData['entities'].forEach(function(entity) {
            if (entity[0] == id) {

              $rootScope.tags.forEach(function(item) {
                if (item.type == entity[1]) {
                  $rootScope.entity = entity;
                  $rootScope.span = getSpan(entity);
                }
              });
              e.srcElement.style.strokeWidth = "5";
            }
          });
        }
      }
    }
    else {
      return;
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
