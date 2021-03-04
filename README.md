# 📚 Books directory server
This is great server platform to save your favorite books. Also in this server included CRUID standard and Authentication.

## 📦 Packages 
* Express JS Web framework
* Multer and FS packages for working with file system
* Express-Session
* Mongoose 
* MongoDB (database)

## Routes
### Plural routes
Books
```
GET /books
POST /books/new
DELETE /books/delete/<typecode>
```
Authors
```
GET /authors
POST /authors/new
DELETE /authors/delete/<typecode>
```
Users
```
❌ GET /users
POST /users/register
POST /users/login
DELETE /users/logout
POST /users/authchecker
PUT /users/user/<typecode>/addbook
PUT /users/user/<typecode>/update"
DELETE /users/user/<typecode>/deletebook/<typecode>
```
### Filter
Use ``.`` to access deep properties
```
GET /authors?firstName=Robert Martin
GET /books?title=Clean Code&publishBefore=<typecode>&publishAfter=<typecode>
```

## 💡 Features 
* Register / Login
* Deploy backend
* App register / login
* Logout
* Create and Add book
* Create and Add new author
* Delete book
* Delete author
* Update user data
* Add a book user collection
* Delete a book user collection 

## 🧲 Relationship between collections
![relationship](src/assets/Relationship.PNG)

## Installation
1. Clone project
```
git clone https://github.com/Almazatun/books-directory-NE.git
```
2. Download dependencies
```
npm install / yarn install
```
3. Start dev server
```
npm run dev / yarn run dev
```
4. Build project 
```
npm run build 
```
5. Start server
```
npm start
```


