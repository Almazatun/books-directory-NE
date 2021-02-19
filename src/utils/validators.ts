import Errors from "./types";

const validatorCreateNewBook = (
    title: string,
    pageCount: number,
    publishDate: string,
) => {
    let errors: Errors = {}
    if (title.trim() === '') {
        errors.title = 'Book title can not be empty 🤬';
    }
    if (!pageCount) {
        errors.pageCount = 'Page count can not be empty 🤬';
    } else if (pageCount === 0) {
        errors.pageCount = 'Page count should be greater then 0️⃣';
    }

    if (!publishDate) {
        errors.publishDate = 'Publish date should be required 🤬';
    }

    return {
        errors: errors,
        valid: Object.keys(errors).length <= 1
    }
}

const validatorCreateNewAuthor = (firstName: string, lastName: string) => {
    let errors: Errors = {}
    if (firstName.trim() === '') {
        errors.firstName = 'First name should be required 🤬';
    }
    if (lastName.trim() === '') {
        errors.lastName = 'Last name should be required 🤬';
    }


    return {
        errors: errors,
        valid: Object.keys(errors).length <= 1
    }
}

export default {
    validatorCreateNewAuthor,
    validatorCreateNewBook
}