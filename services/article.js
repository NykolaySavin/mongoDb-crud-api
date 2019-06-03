import config from '../enviroment';
import S3Service from './s3';
import slugify from 'slugify';
import Article from '../db/models/article';

const s3 = new S3Service();
const mapFileToImage=(body,file,index)=>{
    return {
        key: file.key,
        mimetype:file.mimetype,
        url:file.location,
        caption: body[index] ? body[index].image_caption : ''
    };
}

const mapPageToContent=(images,page,index)=>{
    return {
        title: page.title,
        text_before: page.text_before,
        image: images[index],
        text_after: page.text_after
    };
}
const mapPageToContentWithDeletion=(images,oldArticle,page)=>{
    const image = page.image=='new'?images.shift():oldArticle.content.find(item=>item.image[0].key==page.image).image[0];
    image.caption=page.image_caption;
    return {
        title: page.title,
        text_before: page.text_before,
        image: [image],
        text_after: page.text_after
    };
}
module.exports = {

    async findArticle(req, res, next) {
        try {
            const article = await Article.findOne({_id: req.params.id});

            res.send(article);
        } catch (err) {
            next(err);
        }
    },
    async getArticles(req, res, next) {
        try {
            const articles = await Article.find();

            res.send(articles);
        } catch (err) {
            next(err);
        }
    },
    async createArticle(req, res, next) {
        try {
            const { title, body } = req.body;
            const images = req.files?req.files.map(mapFileToImage.bind(null,body)):[];
            const content =body? body.map(mapPageToContent.bind(null,images)):[];

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

    async updateArticle(req, res, next) {
        try {
            const { title, body } = req.body;
            const article = await Article.findOne({_id: req.params.id});
            if (!article) {
                return res.status(404).send();
            }
            const images = req.files?req.files.map(mapFileToImage.bind(null,body)):[];
            const content = body? body.map(mapPageToContentWithDeletion.bind(null,images,article)):[];
            article.content.forEach(item=>{
                if(!content.find(element=>item.image[0].key==element.image[0].key))
                {
                    var params = {
                        Bucket: config.bucket_name,
                        Key: item.image[0].key
                    };
                   s3.deleteObject(params);
                }
            })
            article.title = title;
            article.content = content;

            article.save();
            res.send(article);
        } catch (err) {
            next(err);
        }
    },

    async deleteArticle(req, res, next) {
        try {
            const article = await Article.findOne({_id: req.params.id});

            if (!article) {
                return res.status(404).send();
            }
            article.content.forEach(item=>
                item.image.forEach(image=> s3.deleteObject({
                    Bucket: config.bucket_name,
                    Key: image.key
                }))
            )
            article.remove();
            res.send(article);
        } catch (err) {
            next(err);
        }
    }
};