var TagInfo = {
    alias: {
        name: 'ALIAS'
    },
    nonCharacter: {
        name: 'NON-CHARACTER'
    },
    other: {
        name: 'OTHER'
    },
    unresolved: {
        name: 'UNRESOLVED'
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
