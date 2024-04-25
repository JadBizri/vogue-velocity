const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be a greater than or equal to 0.01']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema);