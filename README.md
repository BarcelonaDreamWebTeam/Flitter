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

### GET /api/anuncios - Receive the Ad list

**Parameters**:

| **Parameter** | **DataType** | **Description**                                    |
|---------------|--------------|----------------------------------------------------|
| nombre        | string       | Ad name (unique)                                   |
| venta         | bool         | it indicates if the item is on sale                |
| precio        | number       | the price of the item                              |
| tags          | array        | key words of the ad                                |
| skip          | number       | return results after a certain number of documents |
| limit         | number       | maximum number of results to be returned           |
| fields        | string       | fields to fetch                                    |
| sort          | string       | sort Ads                                           |

**Response messsages**: <br />
- 200 Success
- 404 Not found
- 500 Internal Server Error


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




