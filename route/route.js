const router = require("express").Router({ mergeParams: true });

router.use("/upload", require("./upload"));
router.use("/admin/user", require("./admin/user"));
router.use("/admin/estate", require("./admin/estate"));
router.use("/admin/request", require("./admin/request"));
router.use("/admin/setting", require("./admin/setting"));
router.use("/admin/sms", require("./admin/sms"));
router.use("/estate", require("./estate/estate"));
router.use("/estate/followup", require("./estate/followup"));
router.use("/user", require("./user"));
router.use("/province", require("./province"));
router.use("/city", require("./city"));
router.use("/message", require("./message"));
router.use("/password", require("./password"));
router.use("/info", require("./info"));
router.use("/field", require("./field"));
router.use("/contact_us", require("./contact_us"));
router.use("/customer", require("./customer/customer"));
router.use("/customer/followup", require("./customer/followup"));
router.use("/meeting", require("./meeting"));

module.exports = router;
