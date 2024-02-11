const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');
const items = [
    {
        id: '1',
        title: 'A funny story',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora non velit eos voluptatibus, magnam minima quisquam eligendi odio animi voluptatum cum optio quo alias incidunt pariatur perferendis? Molestiae, nobis perferendis fugit quidem quisquam impedit dicta aperiam laborum, ea molestias aliquam tempore sequi, eos saepe laboriosam? Tempore?',
        author: 'John Doe',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'It is raining',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora non velit eos voluptatibus, magnam minima quisquam eligendi odio animi voluptatum cum optio quo alias incidunt pariatur perferendis? Molestiae, nobis perferendis fugit quidem quisquam impedit dicta aperiam laborum, ea molestias aliquam tempore sequi, eos saepe laboriosam? Tempore?',
        author: 'Jane Doe',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'Learning NBAD',
        content: 'Molestiae, nobis perferendis fugit quidem quisquam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit dicta aperiam laborum, ea molestias aliquam tempore sequi, eos saepe laboriosam? Tempore?',
        author: 'Jad Bizri',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
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