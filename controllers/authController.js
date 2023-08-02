const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

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
            user.save();

            return res.json({ message: 'User created' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers(req, res) {
        try {
            res.json('server works');
        } catch (err) {}
    }
}

module.exports = new authController();
