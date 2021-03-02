import Errors from "./types";

const validatorCreateNewBook = (
    title: string,
    pageCount: number,
    publishDate: string,
): IValidator => {
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

const validatorCreateNewAuthor = (firstName: string, lastName: string): IValidator => {
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


export const validatorNewUserData = (
    email: string,
    userName: string,
    password: string,
): IValidator => {

    const errors: Errors = {}

    //userName
    if (userName.trim() === '') {
        errors.userName = 'User name can not be empty 🤬';
    }
    //email
    if (!email) {
        errors.email = 'Email can not be empty 🤬';
    } else if (!emailRegExp.test(email)) {
        errors.email = 'Invalid email address 🤬';
    }
    //password
    if (!password) {
        errors.password = 'Password can not be empty 🤬'
    } else if (password.length < 6) {
        errors.password = "Password must be 6 characters or more 🤬"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const validatorLogIn = (email: string, password: string): IValidator => {
    const errors: Errors = {}

    //userName
    if (!email) {
        errors.email = 'Email can not be empty 🤬'
    } else if (!emailRegExp.test(email)) {
        errors.email = 'Invalid email address 🤬';
    }
    //password
    if (!password) {
        errors.password = 'Password can not be empty 🤬'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export default {
    validatorCreateNewAuthor,
    validatorCreateNewBook,
    validatorNewUserData,
    validatorLogIn
}

//Regex
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
//const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//Types
interface IValidator {
    errors: null | Errors,
    valid: boolean
}