const Item = require('../models/item');

// check if user is a guest
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in');
        return res.redirect('/profile');
    }
}

// check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to log in first');
        return res.redirect('/login');
    }
}

// check if user is the seller
exports.isSeller = (req, res, next) => {
    let id = req.params.id;
    let seller = req.session.user;
    Item.findById(id)
        .then(item => {
            if (item) {
                if (item.seller.equals(seller)) {
                    return next();
                } else {
                    let err = new Error('You are not authorized to perform this action');
                    err.status = 401;
                    return next(err);
                }
            } else {
                let err = new Error('Cannot find a story with id ' + id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
}

exports.isNotSeller = (req, res, next) => {
    let id = req.params.id;
    let seller = req.session.user;
    Item.findById(id)
        .then(item => {
            if (item) {
                if (item.seller.equals(seller)) {
                    let err = new Error('You are not authorized to perform this action');
                    err.status = 401;
                    return next(err);
                } else {
                    return next();
                }
            } else {
                let err = new Error('Cannot find a story with id ' + id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
}