const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        trim: true
    },
});

const contentSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    text_before: String,
    after_image: String,
    image: {
        type: [imageSchema],
        required: true
    },
    text_after: {
        type: String,
        required: true
    },
});

const ArticleModel = mongoose.model('Article', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: [contentSchema],
        required: true
    }
});

module.exports = ArticleModel;