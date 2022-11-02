### EXPRESS CRUD WITH API GATEWAY


### POSTMAN DOCUMENTATION ONLINE
https://documenter.getpostman.com/view/7871231/2s8YRnmBJ7


### TERMS API 
HOST APIGATEWAY => [http://117.53.47.21:8000/api-gateway](http://117.53.47.21:8000/api-gateway)

X-API-KEY => YXBpLWdhdGV3YXkta2V5

Authorization => Bearer {{YOUR_TOKEN}}


### ENDPOINT AUTH
POST /auth/register

![image](https://user-images.githubusercontent.com/29777307/199466263-7d0c2b15-9d33-4cdb-96b7-86ab3611a81b.png)

Requered Body: email, password

Headers: X-API-KEY

============================================================================================

POST /auth/login

![image](https://user-images.githubusercontent.com/29777307/199466729-9645f3bb-1a58-4076-ae38-968afdd95f1a.png)

Requered Body: email, password

Headers: X-API-KEY

============================================================================================

GET /auth/logout

![image](https://user-images.githubusercontent.com/29777307/199467753-7ca7263d-9cd1-4973-b7d3-db5e8e271ea8.png)

Headers: X-API-KEY, Authorization


### ENDPOINT PRODUCTS
POST /products/create

![image](https://user-images.githubusercontent.com/29777307/199468334-34c4f53b-5352-42ae-af4c-0c769f4e7579.png)

Requered Body: name, price

Headers: X-API-KEY, Authorization

============================================================================================

GET /products/list?page=1&name=test&price_less=1000&price_high=30000

![image](https://user-images.githubusercontent.com/29777307/199468913-df04db9c-7142-453b-9ddf-b607d391c578.png)

Optional Query Params: page, size, name, price_less, price_high

Headers: X-API-KEY, Authorization

============================================================================================

GET /products/detail?id=1

![image](https://user-images.githubusercontent.com/29777307/199469312-74c5ae30-9984-4a8e-8023-7e0c1c2f4053.png)

Requered Query Params: id

Headers: X-API-KEY, Authorization

============================================================================================

UPDATE /products/update?id=1

![image](https://user-images.githubusercontent.com/29777307/199469532-dece64f0-3815-4dc8-9245-08969f8e4d19.png)

Requered Query Params: id

Headers: X-API-KEY, Authorization

============================================================================================

DELETE /products/delete?id=1

![image](https://user-images.githubusercontent.com/29777307/199469683-f41d3d28-9072-4d46-bc8b-6213f7a6fe32.png)

Requered Query Params: id

Headers: X-API-KEY, Authorization
