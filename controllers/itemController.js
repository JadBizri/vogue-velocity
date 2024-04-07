const model = require('../models/item');

exports.index = (req, res) => {
    //sort items by price in descending order and show only active items
    model.find({ active: true }).sort({ price: -1 })
        .then(items => res.render('item/index', { items }))
        .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('item/new');
};

exports.create = (req, res, next) => {
    let item = req.body;
    item.seller = req.session.user;
    if (!req.file) {
        let err = new Error('Please upload an image');
        err.name = 'ValidationError';
        err.status = 400;
        return next(err);
    }
    item.image = '/images/' + req.file.filename;
    item = new model(req.body);
    item.save()
        .then(item => res.redirect('/items'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
}

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('seller', 'firstName lastName')
        .then(item => res.render('item/show', { item }))
        .catch(err => next(err));
}

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(item => res.render('./item/edit', { item }))
        .catch(err => next(err));
}

exports.update = (req, res, next) => {
    let item = req.body;
    console.log(item);
    let id = req.params.id;

    if (!item.image) {
        oldItem = model.findById(id);
        item.image = oldItem.image;
    } else {
        item.image = '/images/' + item.image;
    }

    model.findByIdAndUpdate(id, item, { runValidators: true })
        .then(item => res.redirect('/items/' + id))
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id)
        .then(item => res.redirect('/items'))
        .catch(err => next(err));
}

exports.search = (req, res, next) => {
    let query = req.query.query;
    let filter = {
        active: true,
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { details: { $regex: query, $options: 'i' } }
        ]
    };
    model.find(filter)
        .then(results => {
            res.render('item/index', { items: results });
        })
        .catch(err => next(err));    
}