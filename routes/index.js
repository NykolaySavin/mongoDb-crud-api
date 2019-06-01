import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle
} from "../services/article";
import s3 from "../awsClient";
import config from "../enviroment";
import multer from "multer";
import multerS3 from "multer-s3";

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};
var upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: config.bucket_name,
      acl:"public-read",
      contentType:multerS3.AUTO_CONTENT_TYPE
  })
});
export default function(router) {
  router.get("/api/articles", getArticles);
  router.post("/api/articles", upload.any("body"), createArticle);
  router.put("/api/articles/:id", upload.any("body"), updateArticle);
  router.delete("/api/articles/:id", deleteArticle);
}
