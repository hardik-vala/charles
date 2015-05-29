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
    unresolved: {
        name: 'UNRESOLVED',
        color: '#39FF14'
    },
};

var isAliasTag = function (tag) {
    return tag.type == TagInfo.alias.name;
};

var isCharacterTag = function (tag) {
    return !(tag.type == TagInfo.alias.name ||
        tag.type == TagInfo.nonCharacter.name ||
        tag.type == TagInfo.other.name ||
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
    return text.substring(entity[2][0][0], entity[2][0][1]);
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
