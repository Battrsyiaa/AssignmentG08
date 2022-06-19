const supertest = require('supertest');
const request = supertest('http://localhost:2407');

const Username = [
	{
		name : "Nur'in Batrisyia",
		number : "017-985 6933",
		carplate: "VDY 2423",
	},
	{
		name : "NurZahin Azhari",
		number : "019-865 3434",
		carplate: "CCA 6336",
	},
	{
		name : "Fadliyatul Syifaa",
		number : "011-1875 2588",
		carplate: "DAY 9854",
	},
]

describe("User Account", function() {
	for (let i = 0; i< Username.length; i++) {
		it ('POST', async () => {
			return request
			.post('/create')
			.send({name: Username[i].name, number: Username[i].number, carplate: Username[i].carplate})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual ({
					name: username[i].name
					number: username[i].number
					carplate: username[i].carplate
				})
			})
		});
	}

	it ('GET', async() => {
		return request
		.get('/read')
		.send({name : "Nur'in Batrisyia"})
		.expect('Content-Type', /json/)
		.expect(200).then(res => {
			expect(res.body).toEqual({
				name : "Nur'in Batrisyia"
				number : "017-985 6933",
				carplate: "VDY 2423",
			})
		})
	});


	it ('DELETE', async () => {
		return request
		.delete('/delete')
		.send({name : "NurZahin Azhari"})
		.expect('Content-Type', /json/)
		.expect(200).then(res => {
			expect(res.body).toEqual({
				message: expect.any(String),
				name : "NurZahin Azhari",
				number : "019-865 3434",
				carplate: "CCA 6336",
			});
		})
	})


	it ('PATCH', async () => {
		return request
			.patch('.update')
			.send({name : "Fadliyatul Syifaa", number : "011-1875 2588", carplate: "DAY 9854"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
					message: expect.any(String),
					name : "Fadliyatul Syifaa",
					number : "011-1875 2588",
					carplate: "DAY 9854",
				});
			})
	})
})
