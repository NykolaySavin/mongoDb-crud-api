import bodyParser from "body-parser";
import express from "express";
import routeConfig from "./routes/index";

export default function(app) {
  const router = express.Router();
  routeConfig(router);
  app.use(router);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}
