const { parse } = require('uuid');
const model = require('../models/item');

exports.index = (req, res) => {
    let items = model.find();
    res.render('item/index', { items });
};

exports.new = (req, res) => {
    res.render('item/new');
};

exports.create = (req, res) => {
    let item = req.body;
    model.save(item);
    res.redirect('/items');
}

exports.show = (req, res, next) => {
    var id = req.params.id;
    var item = model.findById(id);

    if (item) {
        res.render('item/show', { item });
    }
    else {
        let err = new Error(`Item with id ${id} cannot be found`);
        err.status = 404;
        next(err);
    }
}

exports.edit = (req, res, next) => {
    let id = req.params.id;
    var item = model.findById(id);

    if (item) {
        res.render('item/edit', { item });
    } else {
        let err = new Error(`Item with id ${id} cannot be found`);
        err.status = 404;
        next(err);
    }
}

exports.update = (req, res, next) => {
    let id = req.params.id;
    let item = req.body;
    if (model.updateById(id, item)) {
        res.redirect('/items/' + id);
    } else {
        let err = new Error(`Item with id ${id} cannot be found`);
        err.status = 404;
        next(err);
    }
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id))
        res.redirect('/items');
    else {
        let err = new Error(`Item with id ${id} cannot be found`);
        err.status = 404;
        next(err);
    }
}