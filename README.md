# Rest API - Node.js

Rest API using plain node.js. NO DEPENDENCIES.

This API do a health check every 1 minute for some given URL. You can create an account, and every account can has 5 "checks". The project uses tokens to validate each user.

## About the project

This Rest API is entirely made for handling uploaded files. The main goal here is resizing uploaded pictures and store them in three different folders : high resolution, medium resolution, low resolution.
This Rest API is made also for handling users, and searching articles.

## How To Run

Download Node.js from the [official site](https://nodejs.org/en/download/) or from [here](https://github.com/creationix/nvm) (like I did), and run the following at the terminal:

```
npm start
```

### Endpoints

- **/users/** :

  - Method: **POST**

    - Description: Create a new user.
    - Body: user_name, user_email, phone, password.

  - Method: **GET**

    - Description: Return a user data by id, or a list of all users.
    - Query String : id_user

  - Method: **PUT**

    - Description: Update the user's fields.
    - Body: user_name

  - Method: **DELETE**
    - Description: Delete a given user.
    - Query String: id_user

  **/tokens/** :

  - Method: **POST**
    - Description: Create a new authentication token for a given user.
    - Body: user_nama,user_email, password

  **/files/**:

  - Method: **POST**
    - Description: Upload pictures and resizing them, create 3 folders, each one has a pic named with a crypted key.
    - Body : file, extension

  **/search articles/**:

  - Method: **GET**
    - Description: Return articl's field.
    - Body: article_city, id_theme,text1,text2,text3,text4,text5

# Multer [![Build Status](https://travis-ci.org/expressjs/multer.svg?branch=master)](https://travis-ci.org/expressjs/multer) [![NPM version](https://badge.fury.io/js/multer.svg)](https://badge.fury.io/js/multer) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. It is written on top of [busboy](https://github.com/mscdex/busboy) for maximum efficiency.

**NOTE**: Multer will not process any form which is not multipart (`multipart/form-data`).

## Installation

```sh
$ npm install --save multer
```

## Usage

Multer adds a `body` object and a `file` or `files` object to the `request` object. The `body` object contains the values of the text fields of the form, the `file` or `files` object contains the files uploaded via the form.

## Full Documentation

[Multer](https://www.npmjs.com/package/multer)
