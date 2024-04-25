const model = require('../models/offer');
const Item = require('../models/item');

exports.create = (req, res, next) => {
    let offer = {
        item: req.params.id,
        user: req.session.user,
        amount: req.body.amount
    };
    offer = new model(offer);
    offer.save()
        .then(offer => {
            Item.findByIdAndUpdate(offer.item, { $inc: { totalOffers: 1 }, $max: { highestOffer: offer.amount} })
                .then(() => {})
                .catch(err => next(err));
            req.flash('success', 'Offer was created successfully');
            res.redirect('/items/' + req.params.id);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
                req.flash('error', err.message);
                res.redirect('back');
            }
            next(err);
        });
}

exports.accept = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndUpdate(id, { status: 'accepted' })
        .then(() => {
            req.flash('success', 'Offer was accepted successfully');
            res.redirect('back');
        })
        .catch(err => next(err));   
}