const bcrypt = require("bcryptjs");
let username = [];

class Username {
	static async injectDB(conn) {
		users = await conn.db("UtemGateSystem").collection("Username")
	}

	//Register new account
	static async register(name, number, carplate) {
		// TODO: Check if name exists
		let usernamesearch = await username.find({ name : name }).toArray()
			if (usernamesearch.length > 0) {
				return null
			}
			else {
				//TODO : Save username to database
				await.username.insertOne({
					name : name, 
					number : number,
					carplate : carplate
				})
			}

			let result = await username.find({name : name}).toArray();
			return result
	};

	static async delete (name) {
		//TODO : Check if carplate exist
		let usernamesearch = await username.find({name : name}).toArray();
		console.log(usernamesearch);
			if (usernamesearch.length == 0) {
				return null
			}
			else {
				await.username.deleteOne({name:name});
				return usernamesearch
			}
	};

	statis async update(name, number, carplate) {
		let usernamesearch = this.search(name);
			if (usernamesearch.length ==0) {
			return null
		}
		else {
			await username.updateOne(
				{name : name},{$set: {number:number, carplate:carplate}
			});
			return usernamesearch 
			}
		};

	static async search(name) {
		//TODO : Check if carplate exist
		let usernamesearch = await username.find({ name : name}).toArray();
		console.log(usernamesearch);
			if (usernamesearch.length == 0) {
				return null
			}
			else {
				return usernamesearch
			}
	};

	static async getAll(name) {
		let usernamesearch = await username.find({ name : name }).project({_id:0}).toArray();
			if (usernamesearch.length == 0 ) {
				return null
			}
			else {
				return usernamesearch
			}
		}
};
	module.exports = Username;