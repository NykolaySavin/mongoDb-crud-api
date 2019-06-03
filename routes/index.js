import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,findArticle
} from "../services/article";
import s3 from "../awsClient";
import config from "../enviroment";
import multer from "multer";
import multerS3 from "multer-s3";


var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucket_name,
      acl:"public-read",
      contentType:multerS3.AUTO_CONTENT_TYPE
  })
});
export default function(router) {
  router.get("/api/articles", getArticles);
    router.get("/api/articles/:id", findArticle);
  router.post("/api/articles", upload.any("body"), createArticle);
  router.put("/api/articles/:id", upload.any("body"), updateArticle);
  router.delete("/api/articles/:id", deleteArticle);
}
