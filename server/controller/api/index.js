import express from 'express';
let router = express.Router();

router.use('/hero', require('./getpostdata'));

module.exports = router;