const router = require('express').Router({ mergeParams: true });

const requestHandler = require('../middleware/requestHandler');

const forgetController = require('../controller/password/forget');
const newController = require('../controller/password/new');
const resetController = require('../controller/password/reset');

router.post('/forget', requestHandler(forgetController));
router.post('/new', requestHandler(newController));
router.post('/reset', requestHandler(resetController));

module.exports = router;
