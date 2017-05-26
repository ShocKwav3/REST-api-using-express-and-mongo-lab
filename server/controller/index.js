import express from 'express';
let router = express.Router();

router.use('/', require('./homeController'));
router.use('/api', require('./api'));

module.exports = router;
