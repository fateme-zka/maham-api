const router = require("express").Router();

const requestHandler = require("../../middleware/requestHandler");


const getAllEstatesController = require("../../controller/estate/followup/getAllEstates");
const getAllCustomersController = require("../../controller/estate/followup/getAllCustomers");
// const getAllFollowupsController = require("../../controller/estate/followup/getAllEstateFollowup");
// const postFollowupController = require("../../controller/estate/followup/postEstateFollowup");
// const putFollowupController = require("../../controller/estate/followup/putEstateFollowup");
// const deleteFollowupController = require("../../controller/estate/followup/deleteEstateFollowup");


router.get("/estate/all", requestHandler(getAllEstatesController));
router.get("/customer/all", requestHandler(getAllCustomersController));
// router.get("/all", requestHandler(getAllFollowupsController));
// router.post("/", requestHandler(postFollowupController));
// router.put("/:id", requestHandler(putFollowupController));
// router.delete("/:id", requestHandler(deleteFollowupController));


module.exports = router;
