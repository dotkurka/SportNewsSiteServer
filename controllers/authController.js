const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('../config/tokenKey');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    };
    return jwt.sign(payload, secret, { expiresIn: '10m' });
};

class authController {
    async registration(req, res) {
        try {
            const erorrs = validationResult(req);
            if (!erorrs.isEmpty()) {
                return res.status(400).json({ message: 'Registartion erorr', erorrs });
            }
            const { firstName, lastName, password, email } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = new User({
                firstName,
                lastName,
                password: hashPassword,
                email,
                roles: [userRole.value],
            });
            await user.save();
            const currentUser = await User.findOne({ email });
            const token = generateAccessToken(currentUser._id, currentUser.roles);
            return res.json({ token });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'No such user exists' });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Password incorrect' });
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUser(req, res) {
        try {
            let token = req.headers.authorization;
            if (token) {
                token = token.split(' ')[1];
            } else {
                return res.status(403).json({ message: 'User is not authorized' });
            }
            const { id } = jwt.verify(token, secret);
            const user = await User.findById(id);
            return res.json(user);
        } catch (err) {
            console.log(err);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new authController();
