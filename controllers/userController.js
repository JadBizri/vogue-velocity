const User = require('../models/user');

exports.new = (req, res) => {
    if (req.session.user) {
        req.flash('error', 'Please logout first');
        return res.redirect('/users/profile');
    }
    res.render('./user/new');
};

exports.enter = (req, res) => {
    if (req.session.user) {
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
    res.render('./user/login');
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.flash('success', 'Login successful');
                            res.redirect('/users/profile');
                        } else {
                            //console.log('Invalid password');
                            req.flash('error', 'Invalid password');
                            res.redirect('/users/login');
                        }
                    })
                    .catch(err => next(err));
            } else {
                //console.log('User not found');
                req.flash('error', 'Email not found');
                res.redirect('/users/login');
            }
        })
        .catch(err => next(err));
}

exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then(() => {
            req.flash('success', 'User created successfully, please login');
            res.redirect('/users/login');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                res.redirect('/users/new');
            }
            if (err.code === 11000) {
                req.flash('error', 'Email already exists');
                res.redirect('/users/new');
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'Please login first');
        return res.redirect('/users/login');
    }
    let id = req.session.user;
    User.findById(id)
        .then(user => res.render('./user/profile', { user: user }))
        .catch(err => next(err));
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}