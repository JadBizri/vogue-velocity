const Offer = require('../models/offer');
const Item = require('../models/item');

exports.create = (req, res, next) => {
    let offer = {
        item: req.params.id,
        user: req.session.user,
        amount: req.body.amount
    };
    offer = new Offer(offer);
    offer.save()
        .then(offer => {
            Item.findByIdAndUpdate(offer.item, { $inc: { totalOffers: 1 }, $max: { highestOffer: offer.amount } })
                .then(() => { })
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

exports.show = (req, res, next) => {
    let id = req.params.id;
    Item.findById(id)
        .then(item => {
            Offer.find({ item: id })
                .populate('user')
                .then(offers => res.render('offer/offer', { item, offers }))
                .catch(err => next(err));
        })
        .catch(err => next(err));
}

exports.accept = (req, res, next) => {
    let id = req.params.id;
    let buyerId = req.body.buyerId;
    let amount = req.body.amount;
    Promise.all([
        Item.findByIdAndUpdate(id, { active: false }),
        Offer.findOneAndUpdate({ item: id, user: buyerId, amount: amount }, { status: 'accepted' }),
        Offer.updateMany({ item: id, status: 'pending' }, { status: 'rejected' })
    ]).then(() => {
        req.flash('success', 'Offer was accepted successfully');
        res.redirect('/items/' + id + '/offers');
    }).catch(err => next(err));
}