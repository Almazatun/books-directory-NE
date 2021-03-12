"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStatements = void 0;
var books_dal_1 = require("../books/books_dal");
function searchStatements(title, publishBefore, publishAfter) {
    if (publishBefore && publishBefore !== '' && publishAfter === '') {
        return books_dal_1.SEARCH.PUBLISH_BEFORE;
    }
    else if (publishAfter && publishAfter !== '' && publishBefore === '') {
        return books_dal_1.SEARCH.PUBLISH_AFTER;
    }
    else if (publishBefore !== '' && publishAfter !== '' && title === '') {
        return books_dal_1.SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER;
    }
    else if (publishAfter && publishAfter !== '' && title && title !== '') {
        return books_dal_1.SEARCH.PUBLISH_AFTER_AND_TITLE;
    }
    else if (publishBefore && publishBefore !== '' && title && title !== '') {
        return books_dal_1.SEARCH.PUBLISH_BEFORE_AND_TITLE;
    }
    else if (title && title !== '' && publishBefore && publishBefore !== '' && publishAfter && publishAfter !== '') {
        return books_dal_1.SEARCH.FILED_ALL;
    }
    else if (title && title !== '') {
        return books_dal_1.SEARCH.BY_TITLE;
    }
    else {
        return null;
    }
}
exports.searchStatements = searchStatements;
//# sourceMappingURL=searchStatements.js.map