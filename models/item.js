const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [3, 'Title must be at least 3 characters'],
        maxLength: [50, 'Title must be at most 50 characters']
    },
    seller: {
        type: String,
        required: [true, 'Author is required'],
        minLength: [3, 'Author must be at least 3 characters'],
        maxLength: [30, 'Author must be at most 30 characters']
    },
    condition: {
        type: String,
        enum: ['new', 'like-new', 'good', 'fair', 'other'],
        required: [true, 'Condition is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    details: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description must be at least 5 characters']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    totalOffers: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
);

//findRandom function to get a random item to be featured on the home page
itemSchema.statics.findRandom = async function() {
    try {
        const count = await this.countDocuments();
        
        const randomIndex = Math.floor(Math.random() * count);
        
        const randomItem = await this.findOne().skip(randomIndex);
        
        return randomItem;
    } catch (error) {
        console.error('Error finding random item:', error);
        throw error;
    }
};

module.exports = mongoose.model('Item', itemSchema);