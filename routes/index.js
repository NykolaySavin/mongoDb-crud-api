import multer from 'multer';
import {getArticles, createArticle, updateArticle, deleteArticle} from '../services/article';
const upload = multer({ dest: './uploads' });
export default function(router) {
    router.get('/', function(req, res) {
        res.send('hello world');
    });
    router.get('/api/articles', getArticles);
    router.post('/api/articles', upload.any('body'), createArticle);
    router.put('/api/articles/:id', upload.any('body'), updateArticle);
    router.delete('/api/articles/:id', deleteArticle);
}