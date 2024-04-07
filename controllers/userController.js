const User = require('../models/user');
const Item = require('../models/item');

exports.new = (req, res) => res.render('user/new');

exports.enter = (req, res) => res.render('user/login');

exports.login = (req, res, next) => {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.flash('success', 'Login successful');
                            res.redirect('/profile');
                        } else {
                            req.flash('error', 'Invalid password');
                            res.redirect('/login');
                        }
                    })
                    .catch(err => next(err));
            } else {
                req.flash('error', 'Email not found');
                res.redirect('/login');
            }
        })
        .catch(err => next(err));
}

exports.create = (req, res, next) => {
    console.log(req.body);
    req.body.email.toLowerCase();
    let user = new User(req.body);
    user.save()
        .then(() => {
            req.flash('success', 'User created successfully, please login');
            res.redirect('/login');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                res.redirect('back');
            }
            if (err.code === 11000) {
                req.flash('error', 'Email already exists');
                res.redirect('/register');
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'Please login first');
        return res.redirect('/login');
    }
    let id = req.session.user;
    Promise.all([User.findById(id), Item.find({ seller: id })])
        .then(results => {
            const [user, items] = results;
            res.render('user/profile', { user, items });
        })
        .catch(err => next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) return next(err);
        else res.redirect('/');
    });
}