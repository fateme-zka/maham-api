const router = require("express").Router();

const requestHandler = require("../middleware/requestHandler");

const PostImageController = require("../controller/upload/addImage");
const deleteImageController = require("../controller/upload/deleteImage");

router.post("/:table/image", requestHandler(PostImageController));
router.delete("/image", requestHandler(deleteImageController));

module.exports = router;
