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
    if (!req.file) {
        let err = new Error('Please upload an image');
        err.name = 'ValidationError';
        err.status = 400;
        return next(err);
    }
    item.image = '/images/' + req.file.filename;
    item = new model(req.body);
    item.save()
        .then(item => {
            res.redirect('/items');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
}

exports.show = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item ID');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
        .then(item => {
            if (item) {
                res.render('item/show', { item });
            }
            else {
                let err = new Error(`Item cannot be found`);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

exports.edit = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item ID');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
        .then(item => {
            if (item) {
                res.render('./item/edit', { item });
            } else {
                let err = new Error('Item cannot be found');
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
}

exports.update = (req, res, next) => {
    let item = req.body;
    console.log(item);
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item ID');
        err.status = 400;
        return next(err);
    }

    if (!item.image) {
        oldItem = model.findById(id);
        item.image = oldItem.image;
    } else {
        item.image = '/images/' + item.image;
    }

    model.findByIdAndUpdate(id, item, { runValidators: true })
        .then(item => {
            if (item) {                
                res.redirect('/items/' + id);
            } else {
                let err = new Error('Item cannot be found');
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item ID');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id)
        .then(item => {
            if (item) {
                res.redirect('/items');
            } else {
                let err = new Error('Item cannot be found');
                err.status = 404;
                return next(err);
            }
        })
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