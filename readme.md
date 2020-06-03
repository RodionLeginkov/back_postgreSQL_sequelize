## Server

- [api-docs](https://exapmle.app/api-docs/#/)

### Environment
- Before start server -
To use env variables on local machine create .env file in the root of the project, containing env variables, like database URI

### Installation
Server:
```
npm run start
```

#### App setup
- FRONTEND_URL - base frontend URL for email invitations 

#### Reset password setup
- EMAIL_ADDRESS 
- EMAIL_PASSWORD

#### AWS BUCKET setup
- AWS_BUCKET_NAME 
- AWS_ACCESS_KEY_ID 
- AWS_SECRET_ACCESS_KEY 
- AWS_REGION
- AWS_Uploaded_File_URL_LINK

#### Default user
- login: user@user.com
- password: adminadmin

#### Database credentials
- DATABASE_URL = postgres://[user]:[password]@[host]:[port]/[db_name]

### Development

#### Naming Conventions

##### Use lowerCamelCase for variables, properties and function names

Variables, properties and function names should use `lowerCamelCase`.  They
should also be descriptive. Single character variables and uncommon
abbreviations should generally be avoided.

##### Use UpperCamelCase for class names

Class names should be capitalized using `UpperCamelCase`.


##### Use UPPERCASE for Constants

Constants should be declared as regular variables or static class properties,
using all uppercase letters.

##### Use kebab-case for file names.

There is no official rule that you have to follow while naming your js file,
but the practice of using a hyphenated name like "some-name.js" is the most widely followed naming convention.