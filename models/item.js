const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');
const items = [
    {
        id: '1',
        title: 'Nike x Carhartt Air Force 1',
        seller: 'Vogue Velocity',
        condition: 'New',
        price: 267.00,
        details: 'Size: Men US 11',
        image: '/images/shoes.jpg',
        totalOffers: 8,
        active: true
    },
    {
        id: '2',
        title: 'Air Jordan 1 Mid SE Craft',
        seller: 'Mo Salah',
        condition: 'Used - Like New',
        price: 99.99,
        details: 'Size: Men US 10.5',
        image: '/images/jordans.jpg',
        totalOffers: 2,
        active: true
    },
    {
        id: '3',
        title: 'Nike Black Air Force 1',
        seller: 'Vogue Velocity',
        condition: 'New',
        price: 160.00,
        details: 'Size: Men US 11',
        image: '/images/aj1-black.jpg',
        totalOffers: 0,
        active: true
    },
    {
        id: '4',
        title: 'White HighTop Converse',
        seller: 'Jayden Cobly',
        condition: 'Used - Fair',
        price: 37.00,
        details: 'Size: Men US 9',
        image: '/images/converse.jpg',
        totalOffers: 1,
        active: true
    },
    {
        id: '5',
        title: 'Black T-Shirt "Yahweh Yireh"',
        seller: 'Adam Horowitz',
        condition: 'Used - Good',
        price: 14.00,
        details: 'Unisex size M',
        image: '/images/black-shirt.jpg',
        totalOffers: 1,
        active: true
    },
    {
        id: '6',
        title: 'Yellow Tracksuit',
        seller: 'Vogue Velocity',
        condition: 'New',
        price: 120.99,
        details: 'A 2 piece yellow tracksuit. Size: Large',
        image: '/images/main-model.jpg',
        totalOffers: 2,
        active: true
    }
];

exports.find = () => items;
exports.findById = id => items.find(item => item.id === id);

exports.save = function(item) {
    item.id = uuidv4();
    item.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    items.push(item);
};

exports.updateById = function(id, newItem) {
    let item = stories.find(item => item.id === id);
    if (item) {
        item.title = newItem.title;
        item.content = newItem.content;
        item.author = newItem.author;
        return true;
    }
    else return false;
}

exports.deleteById = function(id) {
    let index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        return true;
    }
    else return false;
}