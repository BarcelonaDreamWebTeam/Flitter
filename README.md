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

| **Parameter** | **DataType** | **Description**                                    | **Parameter type** |
|---------------|--------------|----------------------------------------------------|--------------------|
| nombre        | string       | Ad name (unique)                                   | form               |
| venta         | bool         | it indicates if the item is on sale                | form               |
| precio        | number       | the price of the item                              | form               |
| tags          | array        | key words of the ad                                | form               |
| skip          | number       | return results after a certain number of documents | form               |
| limit         | number       | maximum number of results to be returned           | form               |
| fields        | string       | fields to fetch                                    | form               |
| sort          | string       | sort Ads                                           | form               |

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

### GET /api/anuncios/{AdId} - Find Ad by Id

**Parameters**: 

| **Parameter** | **DataType** | **Description** | **Parameter type** |
|---------------|--------------|-----------------|--------------------|
| _id (required)| string       | Ad id           | path               |

**Response messsages**: <br />
- 200 Success
- 404 Not found
- 500 Internal Server Error

**Example**: <br />
Request: GET /api/anuncios/63b34fa205dce84ee1958152 <br />

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

### DELETE /api/anuncios/{AdId} - Delete an Ad 

**Parameters**: 

| **Parameter** | **DataType** | **Description** | **Parameter type** |
|---------------|--------------|-----------------|--------------------|
| _id (required)| string       | Ad id           | path               |

**Response messsages**: <br />
- 200 Success
- 404 Not found
- 500 Internal Server Error

**Example**:
Request: DELETE /api/anuncios/63b34fa205dce84ee1958152

Response:
```json

```

### PUT /api/anuncios/{AdId} - Update an Ad 

**Parameters**: <br />

Parameter content-type: application/x-www-form-urlencoded

| **Parameter** | **DataType** | **Description**                     | **Parameter type**                |
|---------------|--------------|-------------------------------------|-----------------------------------|
| _id(required) | string       | Ad id                               | path                              |
| nombre        | string       | Ad name (unique)                    | application/x-www-form-urlencoded |
| venta         | bool         | it indicates if the item is on sale | application/x-www-form-urlencoded |
| precio        | number       | the price of the item               | application/x-www-form-urlencoded |
| tags          | array        | key words of the ad                 | application/x-www-form-urlencoded |
| foto          | string       | picture of the item                 | application/x-www-form-urlencoded |

**Response messsages**: <br />
- 200 Success
- 404 Not found
- 500 Internal Server Error

**Example**: <br />
Request: GET /api/anuncios/63b34fa205dce84ee1958152 <br />
<img width="451" alt="image" src="https://user-images.githubusercontent.com/112942984/211225778-295a27f6-0deb-4c46-a142-5a8774777bf3.png">

Response:
```json
{
    "result": {
        "_id": "63b34fa205dce84ee1958152",
        "nombre": "cama",
        "venta": true,
        "tags": [],
        "__v": 0
    }
}
```



### POST /api/anuncios - Add a new Ad 

**Parameters**: <br />
Parameter content-type: application/x-www-form-urlencoded

| **Parameter** | **DataType** | **Description**                     | **Parameter type**                |
|---------------|--------------|-------------------------------------|-----------------------------------|
| nombre        | string       | Ad name (unique)                    | application/x-www-form-urlencoded |
| venta         | bool         | it indicates if the item is on sale | application/x-www-form-urlencoded |
| precio        | number       | the price of the item               | application/x-www-form-urlencoded |
| tags          | array        | key words of the ad                 | application/x-www-form-urlencoded |
| foto          | string       | picture of the item                 | application/x-www-form-urlencoded |

**Response messsages**: <br />
- 200 Success
- 404 Not found
- 500 Internal Server Error

**Example**:
Request: POST /api/anuncios
<img width="467" alt="image" src="https://user-images.githubusercontent.com/112942984/211225507-93029165-bd3f-4dbf-a9b0-4779635cd1f4.png">

Response:

```json
{
    "result": {
        "nombre": "laptop mac",
        "venta": false,
        "tags": [],
        "_id": "63bb598e29a77f096d8c52a2",
        "__v": 0
    }
}
```



