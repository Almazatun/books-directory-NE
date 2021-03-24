"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorLogIn = exports.validatorNewUserData = void 0;
var validatorCreateNewBook = function (title, pageCount, publishDate) {
    var errors = {};
    if (title.trim() === '') {
        errors.title = 'Book title can not be empty 🤬';
    }
    if (!pageCount) {
        errors.pageCount = 'Page count can not be empty 🤬';
    }
    else if (pageCount === 0) {
        errors.pageCount = 'Page count should be greater then 0️⃣';
    }
    if (!publishDate) {
        errors.publishDate = 'Publish date should be required 🤬';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length <= 1
    };
};
var validatorCreateNewAuthor = function (firstName, lastName) {
    var errors = {};
    if (firstName.trim() === '') {
        errors.firstName = 'First name should be required 🤬';
    }
    if (lastName.trim() === '') {
        errors.lastName = 'Last name should be required 🤬';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length <= 1
    };
};
var validatorNewUserData = function (email, userName, password) {
    var errors = {};
    //userName
    if (userName.trim() === '') {
        errors.userName = 'User name can not be empty 🤬';
    }
    //email
    if (!email) {
        errors.email = 'Email can not be empty 🤬';
    }
    else if (!emailRegExp.test(email)) {
        errors.email = 'Invalid email address 🤬';
    }
    //password
    if (!password) {
        errors.password = 'Password can not be empty 🤬';
    }
    else if (password.length < 6) {
        errors.password = "Password must be 6 characters or more 🤬";
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validatorNewUserData = validatorNewUserData;
var validatorLogIn = function (email, password) {
    var errors = {};
    //userName
    if (!email) {
        errors.email = 'Email can not be empty 🤬';
    }
    else if (!emailRegExp.test(email)) {
        errors.email = 'Invalid email address 🤬';
    }
    //password
    if (!password) {
        errors.password = 'Password can not be empty 🤬';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validatorLogIn = validatorLogIn;
exports.default = {
    validatorCreateNewAuthor: validatorCreateNewAuthor,
    validatorCreateNewBook: validatorCreateNewBook,
    validatorNewUserData: exports.validatorNewUserData,
    validatorLogIn: exports.validatorLogIn
};
//Regex
var emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//# sourceMappingURL=validators.js.map