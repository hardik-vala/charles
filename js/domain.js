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
