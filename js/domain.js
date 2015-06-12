var TagInfo = {
    alias: {
        name: 'ALIAS',
        color: 'red'
    },
    nonCharacter: {
        name: 'NON-CHARACTER',
        color: '#FFFFFF'
    },
    other: {
        name: 'OTHER',
        color: '#BBBBBB'
    },
    unknown: {
        name: '???',
        color: '#777777'
    },
    unresolved: {
        name: 'UNRESOLVED',
        color: '#39FF14'
    },
};

var isAliasTag = function (tag) {
    return tag.type == TagInfo.alias.name;
};

var isNonCharacterTag = function (tag) {
    return tag.type == TagInfo.nonCharacter.name;
};

var isUnresolvedTag = function (tag) {
    return tag.type == TagInfo.unresolved.name;
};

var isCharacterTag = function (tag) {
    return !(tag.type == TagInfo.alias.name ||
        tag.type == TagInfo.nonCharacter.name ||
        tag.type == TagInfo.other.name ||
        tag.type == TagInfo.unknown.name ||
        tag.type == TagInfo.unresolved.name);
};

var ID_IND = 0;
var TYPE_IND = 1;
var CHAR_OFFSETS_IND = 2;
var START_OFFSET_IND = 0;
var END_OFFSET_IND = 1;

var entityEquals = function (entity1, entity2) {
    return (entity1[ID_IND] == entity2[ID_IND] &&
      entity1[TYPE_IND] == entity2[TYPE_IND] &&
      entity1[CHAR_OFFSETS_IND][0][START_OFFSET_IND] == entity2[CHAR_OFFSETS_IND][0][START_OFFSET_IND] &&
      entity1[CHAR_OFFSETS_IND][0][END_OFFSET_IND] == entity2[CHAR_OFFSETS_IND][0][END_OFFSET_IND]);
};

/* Retrieves the span for the given entity from the given text. */
var getEntitySpan = function(text, entity) {
    return text.substring(entity[2][0][0], entity[2][0][1]).trim();
};

/* Sorts the given array of tagged entities by the starting character offset. If
   the offsets are equal, then the one with the lexicographically greater type
   is returned. */
var sortTaggedEntities = function (entities) {
    return entities.sort(function (e1, e2) {
         var startOffset1 = e1[CHAR_OFFSETS_IND][0][START_OFFSET_IND];
         var startOffset2 = e2[CHAR_OFFSETS_IND][0][START_OFFSET_IND];
         
         if (startOffset1 - startOffset2 == 0){
            if (e1[TYPE_IND] < e2[TYPE_IND])
                return 1;
            if (e1[TYPE_IND] > e2[TYPE_IND])
                return -1;
            
            return 0;
         } else
            return startOffset1 - startOffset2;
    });
}

/* Returns the first tagged entity, in terms of character offset, in the given
   array of entities (Assumed to be unsorted). */
var firstTaggedEntity = function (entities) {
    return entities.reduce(function(p, v) { return ((p[2][0][0] < v[2][0][0]) ? p : v); });
};

/* Returns the last tagged entity, in terms of character offset, in the given
   array of entities (Assumed to be unsorted). */
var lastTaggedEntity = function (entities) {
    return entities.reduce(function(p, v) { return ((p[2][0][0] < v[2][0][0]) ? p : v); });
};

/* Returns the entity immediately succeeding the given one, in the given list of
   tagged entities (unsorted). */
var nextTaggedEntity = function(entities, entity) {
    var lastEntity = entities.reduce(function(p, v) {
      return (p[2][0][0] > v[2][0][0]) ? p : v;
    });
    
    return $rootScope.docData.entities.reduce(function(p, v) {
      return (entity[2][0][0] < v[2][0][0] && v[2][0][0] < p[2][0][0]) ? v : p;
    }, lastEntity);
};

/* Returns the index of the givne tagged entity in the array of entities. If it
   doesn't exist, then -1 is returned. */
var findTaggedEntityIndex = function (entities, entity) {
    var i = 0;
    for (i = 0; i < entities.length; i++) {
        if (entityEquals(entities[i], entity))
            return i;
    }
    
    return -1;
};

var getEntityIdNumbers = function (entities) {
    return entities.map(function(e) {
        return parseInt(e[ID_IND].substring(1, e[ID_IND].length));
    });
};

var getMaxEntityIdNumber = function (entities) {
    return getEntityIdNumbers(entities).reduce(function(p, v) {
      return ((p > v) ? p : v);
    });
};

var getNewEntityIdNumber = function (entities) {
    var idNums = getEntityIdNumbers(entities);
    
    var i = 1;
    for (i = 1; i <= idNums.length; i++) {
        if (idNums.indexOf(i) == -1)
            return i;
    };
    
    return i;
};

/* Returns the entities with the same offsets as the given entity in the list of
   tagged entities. */
var getSameOffsetEntities = function (entities, entity) {
  return entities.filter(function (e) {
     return e[CHAR_OFFSETS_IND][0][START_OFFSET_IND] == entity[CHAR_OFFSETS_IND][0][START_OFFSET_IND];
  });
};

/* Checks if the given list of entities has an entity tagged with the given
   type. Alternatively can check if an entity is tagged with a given type. */
var hasType = function (entities, type) {
    if (entities.length == 0)
        return false;
    
    if (entities[0] instanceof Array)
        return entities.filter(function (e) {
           return e[TYPE_IND] == type; 
        }).length > 0;  
    
    // Otherwise 'entities' is assumed to be a single tagged entity.
    var entity = entities;
    return entity[TYPE_IND] == type;
};

/* Checks if the given list of entities has an entity tagged with ALIAS.
   Alternatively can check if an entity is tagged with ALIAS. */
var hasAliasType = function (entities) {
    return hasType(entities, TagInfo.alias.name);
};

/* Checks if the given list of entities has an entity tagged with UNRESOLVED.
   Alternatively can check if an entity is tagged with UNRESOLVED. */
var hasUnresolvedType = function (entities) {
    return hasType(entities, TagInfo.unresolved.name);
};

var getAliases = function (entities) {
    return entities.filter(function(e) {
        return hasAliasType(e);
    });
};

var getUnresolveds = function (entities) {
    return entities.filter(function(e) {
        return hasUnresolvedType(e);
    });
};

var countAliases = function (entities) {
   return getAliases(entities).length;
};

var countUnresolveds = function (entities) {
   return getUnresolveds(entities).length;
};

/* Removed the given entity from the list of entities. (If it doesn't exist,
   then the same list is returned.)*/
var removeEntity = function (entities, entity) {
    return entities.filter(function(e) {
        return !entityEquals(e, entity);
    });  
};
