const { body } = require('express-validator');

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    return next();
}

exports.validateSignup = [
    body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
    body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({ min: 8, max: 64 })
];

exports.validateLogin = [
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({ min: 8, max: 64 })
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    else return next();
}

exports.validateItem = [
    body('title', 'Title cannot be empty').notEmpty().trim().escape(),
    body('details', 'Item description cannot be empty and must be at least 5 characters').isLength({ min: 5 }).trim().escape(),
    body('price', 'Price must be a positive number').isFloat({ min: 0.01 }),
    body('condition', 'Condition is required').notEmpty().isIn(['new', 'like-new', 'good', 'fair', 'other'])
];

exports.validateOffer = [
    body('amount', 'Amount must be a positive number').isFloat({ min: 0.01 })
];