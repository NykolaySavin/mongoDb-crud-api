import {getArticles, createArticle, updateArticle, deleteArticle} from '../services/article';
import s3 from '../awsClient';
import express from 'express';
const path = require('path');
import config from '../enviroment';
var multer = require('multer')
var multerS3 = require('multer-s3')

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};
var upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: config.bucket_name,
    })
})
export default function(router) {
    router.get('/api/articles', getArticles);
    router.post('/api/articles', upload.any('body'), createArticle);
    router.put('/api/articles/:id', upload.any('body'), updateArticle);
    router.delete('/api/articles/:id', deleteArticle);
}