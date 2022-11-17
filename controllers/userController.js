require("dotenv").config();
require("../config/database").connect();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");


// Register
exports.userRegister = (async (req, res) => {
    // our register logic goes here...
    try {
        // Get user input
        const { first_name, last_name, email, password, role } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(422).send({ message: 'Todos campos devem ser preenchidos!' });
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            res.status(409).send({ message: 'Usuário já registrado. Por favor faça login.' });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role: role ? role : 'teacher'
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1y",
            }
        );
        // save user token
        user.token = token;

        //  new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao criar usuário.' })
    }
});

// Login
exports.login = (async (req, res) => {
    // our login logic goes here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).json({message: 'Forneça e-mail e senha.'});
        }
        // Validate if user exist in our database
        let user = await User.findOne({ email }).select('+password');

        if (user && (await bcrypt.compare(password, user.password))) {
            // console.log('user:', user);
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email, role: user.role},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1y",
                }
            );
            user.password = null
            delete user.password

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        res.status(400).json({message: "Credencial inválida."});
    } catch (err) {
        console.log(err);
        res.status(500)
    }
    // Our register logic ends here
});

exports.user = (async (req, res) => {
    const user = await User.findOne({ _id: req.user.user_id })
    if (req.user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "Por favor faça login" })
    }
});

exports.delete = (async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (user) {
            res.status(200).send({ message: 'Usuário removido com sucesso!' })
        } else {
            res.status(404).send({ message: 'Nenhum usuário removido!' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor!' })
    }
})