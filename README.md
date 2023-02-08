# Flitter

## Setup

Deploy:

```sh
npm install
```

Start the applications in production with:

```sh
npm start 
```

Start mongo DB:
Download Mongo DB from https://www.mongodb.com/ and execute mongod. In windows execute mongod.exe, while in Mac and Linux with "./bin/mongod --dbpath ./data"

Start the applications in development with:

```sh
npm run dev 
```

Load initial data to database:

```sh
npm run init-db
```


## API Documentation 

### POST /api/users/login

Example

Body:
{
    "email" : "emily@gmail.com"
    "password" : "hola"
}

Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2UyZGY1ZTZkMGE3NmU2ZGRjYzVjMWUiLCJpYXQiOjE2NzU4MTc0NzB9.tzZS9W6AKErN-_lJtGbvwJGh4q6XPsVrWSn2qLR51xM",
    "user": {
        "_id": "63e2df5e6d0a76e6ddcc5c1e",
        "email": "emily@gmail.com",
        "password": "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2",
        "__v": 0
    }
}


### POST /api/users/signup

Example

Body:
{
    "email" : "genoveffa@gmail.com"
    "password" : "ciel"
}

Response:
{
    "token": "fgKhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2UyZGY1ZTZkMGE3NmU2ZGRjYzVjMWUiLCJpYXQiOjE2NzU4MTc0NzB9.tzZS9W6AKErN-_lJtGbvwJGh4q6XPsVrWSn2qLR61xO",
    "user": {
        "_id": "63e2df5e6d0a76e6ddcc56bg",
        "email": "genoveffa@gmail.com",
        "password": "$2a$12$dfgdg$vfvf/DwfQKDd2hi.fdbEcKkj8D2",
        "__v": 0
    }
}



### GET /api/protected

Headers:
Authorization: token

Response:
example of protected request




