"# redis_crud" 


1. npm install
2. node index.js to start the server - port 3000
3. Crud Operations route
	a. create user - url: http://localhost:3000/api/user
		body - {
			username : username,
			address: address,
			age : 26 }
	b. get user - url: http://localhost:3000/api/user/:username
	c. update user - url: http://localhost:3000/api/user/:username
		body - {
			username : username,
			address: address,
			age : 26 }
	d. delete user - url: http://localhost:3000/api/user/:username