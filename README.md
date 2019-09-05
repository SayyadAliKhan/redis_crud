"# redis_crud" 


1. npm install
2. node index.js to start the server - port 3000
3. Before using api create a admin
	a. create admin - url: http://localhost:3000/auth/addAdmin
		body - {
				"email" : "test@gmail.com",
				"password" : "test123"
				}
4. Login using the same credentials - url : http://localhost:3000/auth/login
		body - {
				"email" : "test@gmail.com",
				"password" : "test123"
				}
5. Crud Operations route
	a. create user - url: http://localhost:3000/api/user
		body - {
			username : "username",
			address: "address",
			age : 26 }
		set headers : {authorization : token} - token is generated when you login
	b. get user - url: http://localhost:3000/api/user/:username
		set headers : {authorization : token}
	c. update user - url: http://localhost:3000/api/user/:username
		body - {
			username : username,
			address: address,
			age : 26 }
			
		set headers : {authorization : token}
	d. delete user - url: http://localhost:3000/api/user/:username
		set headers : {authorization : token}
6. test cases for api's has been written, auth is something which was needed to secure the endpoints(test not available)
7. I have used JWT token for authentication purpose

