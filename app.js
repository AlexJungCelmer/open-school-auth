require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());

// Logic goes here
// importing user context
const User = require("./model/user");

// Register
app.post("/user/register", async (req, res) => {
	// our register logic goes here...
	try {
		// Get user input
		const { first_name, last_name, email, password } = req.body;

		// Validate user input
		if (!(email && password && first_name && last_name)) {
			res.status(400).send({ message: 'Todos campos devem ser preenchidos!' });
		}

		// check if user already exist
		// Validate if user exist in our database
		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(409).send({ message: 'Usuário já registrado. Por favor faça login.' });
		}

		//Encrypt user password
		encryptedPassword = await bcrypt.hash(password, 10);

		// Create user in our database
		const user = await User.create({
			first_name,
			last_name,
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		});

		// Create token
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "1w",
			}
		);
		// save user token
		user.token = token;

		// return new user
		return res.status(201).json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: 'Erro ao criar usuário.' })
	}
});

// Login
app.post("/user/login", async (req, res) => {
	// our login logic goes here
	try {
		// Get user input
		const { email, password } = req.body;

		// Validate user input
		if (!(email && password)) {
			return res.status(400).send("All input is required");
		}
		// Validate if user exist in our database
		let user = await User.findOne({ email }).select('+password');

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);
			user.password = null
			delete user.password

			// save user token
			user.token = token;

			// user
			return res.status(200).json(user);
		}
		return res.status(400).send("Invalid Credentials");
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Erro no servidor!" })
	}
	// Our register logic ends here
});

app.get("/user/", auth, async (req, res) => {
	const user = await User.findOne({ email: req.user.email })
	if (user) {
		return res.status(200).send({ user })
	} else {
		return res.status(404).send({ message: "Usuário não encontrado" })
	}
});

app.delete("/user/:id", auth, async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findByIdAndDelete(id)
		if (user) {
			return res.status(200).send({ message: 'Usuário removido com sucesso!' })
		} else {
			return res.status(404).send({ message: 'Nenhum usuário removido!' })
		}
	} catch (error) {
		return res.status(500).send({ message: 'Erro no servidor!' })
	}
})

module.exports = app;