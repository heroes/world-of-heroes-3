var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, index: true, unique: true },
    nick: { type: String },
    pass: { type: String },
    email: { type: String, unique: true }
});

mongoose.model('User', UserSchema);
