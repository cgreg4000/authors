const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required."],
        minlength: [3, "Name must be at least 3 characters long."]
    }
},
    { timestamps: true }
);

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;