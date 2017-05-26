# REST-api-using-express-and-mongo-lab

1. Clone the repository
2. Run `npm install`
3. Run `npm start`

Save data on [mLab](https://mlab.com) (or locally, just change the `url` in `server/config/database.js` accordingly):

Using [Postman](https://www.getpostman.com/) send a `post` request to http://localhost:3000/api/hero with sample object: 
`{
	"name": "Clark Kent",
	"superpower": "Super Strength",
	"city": "Metro",
	"age": 35,
	"metahuman": true,
	"nickname": "Superman"
}`

`get` request on the same url (http://localhost:3000/api/hero) will display all the data from database that was stored.

[Babel](https://github.com/babel/babel) is used to transpile ES6/ES2015 with [Webpack](https://github.com/webpack/webpack) 2.

Server auto restarts on file change using webpacks watch feature.

[ESLint](http://eslint.org/) activated.
