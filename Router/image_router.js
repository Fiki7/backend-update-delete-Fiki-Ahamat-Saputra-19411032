"use strict";
const router = require("express").Router();
const controller = require("../Controller/image_controller");
router.post("/upload", controller.upload);
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);
module.exports = router;
