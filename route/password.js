const router = require('express').Router({ mergeParams: true });

const requestHandler = require('../middleware/requestHandler');

const forgetController = require('../controller/password/forget');
const newController = require('../controller/password/new');

router.post('/forget', requestHandler(forgetController));
router.post('/new', requestHandler(newController));

module.exports = router;
