// Controller for all article routes

const slugify = require('slugify');
const path = require('path');
const fs = require('fs');
const Article = require('../db/models/article');

module.exports = {

    // Get all articles
    async getArticles(req, res, next) {
        try {
            const articles = await Article.find();

            res.send(articles);
        } catch (err) {
            next(err);
        }
    },

    // Create new article
    async createArticle(req, res, next) {
        try {
            const { title, body } = req.body;

            let images = [];

            if (req.files) {
                req.files.forEach((file, index) => {
                    const original = file.filename;
                    const filename = file.filename + path.extname(file.originalname);
                    const source = path.join('./uploads', original);
                    const dest = path.join('./', filename);
                    const caption = body[index] ? body[index].image_caption : '';

                    // copy original to static dir
                   fs.copyFile(source, dest, (err) => {
                        if (err) throw err;
                    });

                    images.push({
                        original: original,
                        filename: filename,
                        caption: caption
                    });
                });
            }

            let content = [];

            body.forEach((page, index) => {
                content.push({
                    title: page.title,
                    text_before: page.text_before,
                    image: images[index],
                    text_after: page.text_after
                });
            });

            const article = new Article({
                title: title,
                slug: slugify(title, { lower: true }),
                content: content
            });

            await article.save();
            res.status(201).send(article);
        } catch (err) {
            next(err);
        }
    },

    // Update an article
    async updateArticle(req, res, next) {
        try {
            const { title, body } = req.body;
            const article = await Article.findOne({_id: req.params.id});

            if (!article) {
                return res.status(404).send();
            }

            let images = [];

            if (req.files) {
                req.files.forEach((file, index) => {
                    const original = file.filename;
                    const filename = file.filename + path.extname(file.originalname);
                    const source = path.join('./uploads', original);
                    const dest = path.join('./public/static', filename);
                    const caption = body[index] ? body[index].image_caption : '';

                    // copy original to static dir
                    fs.copyFile(source, dest, (err) => {
                        if (err) throw err;
                    });

                    images.push({
                        original: original,
                        filename: filename,
                        caption: caption
                    });
                });
            }

            let content = [];

            body.forEach((page, index) => {
                content.push({
                    title: page.title,
                    text_before: page.text_before,
                    image: images[index],
                    text_after: page.text_after
                });
            });

            //@todo: remove old images

            article.title = title;
            article.content = content;

            article.save();
            res.send(article);
        } catch (err) {
            next(err);
        }
    },

    // Delete an article
    async deleteArticle(req, res, next) {
        try {
            const article = await Article.findOne({_id: req.params.id});

            if (!article) {
                return res.status(404).send();
            }

            //@todo: remove all images

            article.remove();
            res.send(article);
        } catch (err) {
            next(err);
        }
    }
};