const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    bookId: { type: ObjectId, ref: 'books' },
    userId: { type: ObjectId, ref: 'users' },
    date: { type: Date,default:Date.now},
});
// Đảm bảo rằng bảng Products chưa được định nghĩa trước đó
module.exports = mongoose.model('favorite', schema, 'favorites');