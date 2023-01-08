# Nodepop

## Setup

Deploy:

'''sh
npm install
'''

Start the applications in production with:

'''sh
npm start 
'''

Start mongo DB:
Download Mongo DB from https://www.mongodb.com/ and execute mongod. In windows execute mongod.exe, while in Mac and Linux with "./bin/mongod --dbpath ./data"

Start the applications in development with:

'''sh
npm run dev 
'''

Load initial data to database:

'''sh
npm run init-db
'''


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

**Response messsages**:
200 Success
404 not found


**Example**:
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
        {
            "_id": "63b351e205dce84ee1958153",
            "venta": true,
            "precio": 50,
            "foto": "iphone.png",
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "nombre": "iPhone 3GS"
        },
        {
            "_id": "63b3523205dce84ee1958154",
            "nombre": "tesla",
            "venta": true,
            "precio": 35000,
            "foto": "tesla.png",
            "tags": [
                "lifestyle",
                "auto"
            ]
        },
        {
            "_id": "63b352d305dce84ee1958155",
            "nombre": "sofá amarillo",
            "venta": false,
            "precio": 300,
            "foto": "sofá.png",
            "tags": [
                "decoracion",
                "casa"
            ]
        }
    ]
}

### Find Ad by Id
GET /api/anuncios/{AdId}

**Example**:
Request: GET /api/anuncios/63b34fa205dce84ee1958152

Response:
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

### Delete an Ad 
DELETE /api/anuncios/{AdId}

**Example**:
Request: DELETE /api/anuncios/63b34fa205dce84ee1958152

Response:

### Update an Ad 
DELETE /api/anuncios/{AdId}

### Add a new Ad 
DELETE /api/anuncios/{AdId}




