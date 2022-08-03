# Read Me for starting the API

The application is dockerized, so by running the following command, one can start the API services.

```bash
sudo docker-compose up
```

The application is located at `http://localhost:3000` and API routes are same as mentioned in the docs.

For example to get the list of sellers one can visit `http://localhostL:3000/api/buyer/list-of-sellers` to get a list of sellers.

# API examples

## Register

`http://127.0.0.1:3000/api/auth/register`

```json
{
    "username": "john",
    "password": "john",
    "userType": "seller"
}
```

## Login

`http://127.0.0.1:3000/api/auth/login`

```json
{
    "username": "john",
    "password": "john"
}
```

## List of sellers

`http://127.0.0.1:3000/api/buyer/list-of-sellers`

## Create catalogue

`http://127.0.0.1:3000/api/seller/create-catalog`

JWT token should be given in token header like this

```
Content-Type: application/json
token: jwt-token
```

```json
{
    "products": [
        {
            "name": "FireTV",
            "price": 14999
        },
        {
            "name": "AndroidTV",
            "price": 15999
        }
    ]
}
```

## Seller catalogue

`http://127.0.0.1:3000/api/buyer/seller-catalog/seller_id`

## Create order

Token required 

`http://127.0.0.1:3000/api/buyer/create-order/seller_id`

```json
{
    "products": [
        {
            "name": "FireTV"
        },
        {
            "name": "AndroidTV"
        }
    ]
}
```

## Get orders

Token required

`http://127.0.0.1:3000/api/seller/orders`




