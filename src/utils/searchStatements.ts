import {SEARCH} from "../books/books_dal";

export function searchStatements (title: string, publishBefore: string, publishAfter: string): SEARCH | null {

    if (publishBefore && publishBefore !== '' && publishAfter === '') {
        return SEARCH.PUBLISH_BEFORE
    } else if (publishAfter && publishAfter !== '' && publishBefore === '') {
        return SEARCH.PUBLISH_AFTER
    } else if (publishBefore !== '' && publishAfter !== '' && title === '') {
        return SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER
    } else if (publishAfter && publishAfter !== '' && title && title !== '') {
        return  SEARCH.PUBLISH_AFTER_AND_TITLE
    } else if (publishBefore && publishBefore !== '' && title && title !== '') {
        return  SEARCH.PUBLISH_BEFORE_AND_TITLE
    } else if (title && title !== '' && publishBefore && publishBefore !== '' && publishAfter && publishAfter !== '') {
        return SEARCH.FILED_ALL
    } else if (title && title !== '') {
        return SEARCH.BY_TITLE
    } else {
        return null
    }
}