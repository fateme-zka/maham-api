const router = require("express").Router({ mergeParams: true });

router.use("/estate", require("./estate"));
router.use("/user", require("./user"));

module.exports = router;
