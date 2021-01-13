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

  - Method: **POST** : localhost:3000/api/

    + Description: Create a new user.
    
    + Request
        - user_name,uset_email, phone,password, code_type_user 
        + Body :
          {
            "nom_user": "user10",
            "email_user" : "user10@gmail.com",
            "password": "user10",
            "code_type_user":"ADMI",
            "tel": "06112255"
          }

    + Response 
        + Body
          {
            "message": "succeess user added",
            "data": {
              "fieldCount": 0,
              "affectedRows": 1,
              "insertId": 100,
              "serverStatus": 2,
              "warningCount": 0,
              "message": "",
              "protocol41": true,
              "changedRows": 0
            }
          }


  - Method: **GET : localhost:3000/api/:id

    + Description: Return a user data by id, or a list of all users.
    + Params
        + id_user : Numeric id of the User to perform action
    + Response
        + Body
          {
          "message": "Get user by id done",
          "data": [
            {
              "id_user": 91,
              "nom_user": "laassiri",
              "prenom_user": "wissal",
              "code_type_user": "ADMI",
              "flag_actif": "O"
            }
          ]
          }

  - Method: **PUT** : localhost:3000/api/

    + Description: Update the user's fields.
    + Request
      + Body
        {
          "id": 91,
          "code_type_user":"ADMI"
        }
    + Response
      + Body
        {
        "message": "changes Done",
        "data": {
          "fieldCount": 0,
          "affectedRows": 1,
          "insertId": 0,
          "serverStatus": 2,
          "warningCount": 0,
          "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
          "protocol41": true,
          "changedRows": 1
        }
        }

  - Method: **DELETE** : localhost:3000/api/:id
    + Description: Delete a given user.
    + Params
      + id_user : Numeric id of the User to perform action
    + Response
      + Body
        {
        "message": "User deleted "
        }

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
