# Nodepop

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

### Receive the Ad list:
GET /api/anuncios

**Parameters**:

| **Parameter** | **DataType** | **Description**    |
|---------------|--------------|--------------------|
| nombre        | string       | nombre del anuncio |
| venta         | bool         |                    |
| precio        | number       |                    |
| tags          | array        |                    |
| skip          | number       |                    |
| limit         | number       |                    |
| fields        | string       |                    |
| sort          | string       |                    |

**Response messsages**: <br />
200 Success
404 Not found
500 Internal Server Error


**Example**: <br />
Request: <br />
/api/anuncios?venta=true&limit=3&skip=0&fields=nombre%20precio&sort=precio <br />

Response:
```json
{
   "results": [
      {
         "_id": "63b351e205dce84ee1958153",
         "precio": 50,
         "nombre": "iPhone 3GS"
      },
      {
         "_id": "63b34fa205dce84ee1958152",
         "nombre": "bicicleta",
         "precio": 230.15
      },
      {
         "_id": "63b3523205dce84ee1958154",
         "nombre": "tesla",
         "precio": 35000
      }
   ]
}
```

### Find Ad by Id
GET /api/anuncios/{AdId}

**Example**:
Request: GET /api/anuncios/63b34fa205dce84ee1958152

Response:
```json
{
    "results": [
        {
            "_id": "63b34fa205dce84ee1958152",
            "nombre": "bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ]
        },
    ]
}
```

### Delete an Ad 
DELETE /api/anuncios/{AdId}

**Example**:
Request: DELETE /api/anuncios/63b34fa205dce84ee1958152

Response:

### Update an Ad 
DELETE /api/anuncios/{AdId}

### Add a new Ad 
DELETE /api/anuncios/{AdId}




