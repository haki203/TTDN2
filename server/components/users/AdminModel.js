const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    full_name: {type: String,required:true}, // kiểu dữ liệ},
    email:{type:String,unique:true,required:true},
    phone:{type:Number,required:true},
    position:{type:String,required:true},
    type:{type:Number,required:true},
});
module.exports = mongoose.models.admin || mongoose.model('admins', schema);
// user -----> users