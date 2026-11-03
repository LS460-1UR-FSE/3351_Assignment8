# REST API Testing Evidence

## Testing Method

The API was tested locally using curl.exe from PowerShell.
The server was started with npm start.
The -i option displayed HTTP response headers and status codes.

I have also included the live log from PowerShell

## Test Results

| Test | Endpoint | Expected status | Observed status |
| -----| ---------| --------------- | --------------- |

| Retrieve all tasks | GET /api/resources | 200 OK | 200 OK|
| Retrieve task 1 | GET /api/resources/1 | 200 OK | 200 OK|
| Create a task | POST /api/resources | 201 Created | 201 Created|
| Update the created task | PUT /api/resources/4 | 200 OK | 200 OK|
| Delete the created task | DELETE /api/resources/4 | 200 OK | 200 OK|
| Retrieve the deleted task | GET /api/resources/4 | 404 Not Found | 404 Not Found|

## Command and Response Evidence

---------------------------------------------------
PS C:\Users\jorda\Desktop\3351_Assignment8> curl.exe -i http://localhost:3000/api/resources  
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 119
ETag: W/"77-OSXS+amTGZIJeVF4KwgrDpGlR6w"
Date: Tue, 03 Nov 2026 09:36:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"Task 1: Study Node.js","completed":false},{"id":3,"title":"Task 3: Study MongoDB","completed":false}]

----------------------------------------------------
PS C:\Users\jorda\Desktop\3351_Assignment8> curl.exe -i http://localhost:3000/api/resources/1 
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 58
ETag: W/"3a-1KdIlFWeTNxKORUG5MIN/NVVtvE"
Date: Tue, 03 Nov 2026 09:35:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":1,"title":"Task 1: Study Node.js","completed":false}
-----------------------------------------------------

PS C:\Users\jorda\Desktop\3351_Assignment8> '{"title":"Test task"}' | Set-Content -Encoding ascii create.json
>> curl.exe -i -X POST http://localhost:3000/api/resources -H "Content-Type: application/json" --data-binary "@create.json"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-GEysTga7q5mWVobnrd/YlJ04NDE"
Date: Tue, 03 Nov 2026 09:36:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"title":"Test task","completed":false}
-------------------------------------------------------

PS C:\Users\jorda\Desktop\3351_Assignment8> '{"title":"Updated test task","completed":true}' | Set-Content -Encoding ascii update.json
>> curl.exe -i -X PUT http://localhost:3000/api/resources/4 -H "Content-Type: application/json" --data-binary "@update.json"
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 53
ETag: W/"35-ri11l0uEZU4lj/IO5ooDkaD+KcU"
Date: Tue, 03 Nov 2026 09:37:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"title":"Updated test task","completed":true}
-------------------------------------------------------

PS C:\Users\jorda\Desktop\3351_Assignment8> curl.exe -i -X DELETE http://localhost:3000/api/resources/4
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 31
ETag: W/"1f-XjJ/os3QNJHJwQlQunMyigkAWF4"
Date: Tue, 03 Nov 2026 09:38:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Resource deleted."}
-------------------------------------------------------

PS C:\Users\jorda\Desktop\3351_Assignment8> curl.exe -i http://localhost:3000/api/resources/4
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 30
ETag: W/"1e-BQ/ntIlGyEoqb4YfgLEMv46EwWQ"
Date: Tue, 03 Nov 2026 09:38:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Resource not found"}
-------------------------------------------------------