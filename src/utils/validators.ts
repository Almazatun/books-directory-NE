import Errors from "./types";

const validatorCreateNewBook = (
    title: string,
    pageCount: number,
    publishDate: string,
    authorName: string
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

    if (publishDate.trim() === '') {
        errors.publishDate = 'Publish date should be required 🤬';
    }

    if (authorName.trim() === '') {
        errors.publishDate = 'Author name should be required 🤬';
    }


    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    }
}

const validatorCreateNewAuthor = (name: string) => {
    let errors: Errors = {}
    if (name.trim() === '') {
        errors.name = 'Author name can not be empty 🤬';
    }

    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    }
}

export default {
    validatorCreateNewAuthor,
    validatorCreateNewBook
}