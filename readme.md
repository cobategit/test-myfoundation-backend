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
