const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');
const roleMiddelware = require('../middleware/roleMiddelware');

router.post(
    '/registration',
    [
        check('firstName', 'First name cannot be empty').notEmpty().isLength({ max: 15, min: 2 }),
        check('lastName', 'Last name cannot be empty').notEmpty().isLength({ max: 15, min: 2 }),
        check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
        check('email', 'Email not valid').isEmail(),
    ],
    controller.registration
);
router.post('/login', controller.login);
router.get('/user', controller.getUser);
router.get('/users', roleMiddelware, controller.getUsers);

module.exports = router;
