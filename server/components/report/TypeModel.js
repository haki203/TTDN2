const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    name: { type: String, required: true }, // Tiêu đề (bắt buộc phải có)
    type: { type: Number}, // Tham chiếu đến bảng Category thông qua khóa ngoại CategoryID
});
// Đảm bảo rằng bảng Products chưa được định nghĩa trước đó
module.exports = mongoose.models.type || mongoose.model('types', schema);
