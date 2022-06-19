const MongoClient = require("mongodb").MongoClient;
const User = require("./user");


MongoClient.connect(
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.yn2d1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 2407

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Get/Read
app.get('/get', async (req, res) => {
	console.log(req.body)
	const gate = await User.search(req.body.id);
	if (gate !=null){
		console.log("Id found!")
		res.status(200).json({
			name: search[0].name,
			number: search[0].number,
			carplate: search[0].carplate
		})
	}
	else{
		console.log("Id not found!")
		res.status(404).json()
	}
	});

//Post/Create
app.post('/new', async (req, res) => {
	console.log(req.body)
	const username = await Username.register(req.body.name, req.body.number, req.body.carplate);
	if ( username != null ) {
		console.log("Username registered");
		res.status(200).json({
			name: username[0].name,
			number: username[0].number,
			carplate: username[0].carplate
		})
	}
	else {
		console.log("Username not registered");
		res.status(401).send({
			error: "Username not registered"
		})
	}
})


//Delete/Delete
app.patch('/delete', async (req, res) => {
	console.log(req.body)
	const username = await Username.delete(req.body.name);
	if (username != null) {
		console.log ("Username deleted");
		res.status(200).json({
			message: "Account with this username will deleted.",
			name: username[0].name
			number: username[0].number
			carplate: username[0].carplate
		})
	}
	else{
		console.log("Username not found");
		res.status(404).json({
			message: "No account will deleted."
		})
	}
})

//Patch/Update
app.delete('/update', async (req, res) => {
	console.log(req.body)
	const username = await Username.update(req.body.name, req.body.number, req.body.carplate);
	if (username != null) {
		console.log("Username updated")
		res.status(200).json({
			message: "This account username's details will updated.",
			name: username[0].name
			number: username[0].number+ " to " +req.body.number,
			carplate: username[0].carplate+ " to "+req,body.carplate
		})
	}
	else {
		console.log("Username not found.");
		res.status(404).json({
			message: "No username updated."
		})
	}

})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})