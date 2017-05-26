import express from 'express';
const router = express.Router();
import hero from '../../model/mongodb/heroes';

//show hero from database
router.get('/', (req, res) => {
    hero.find({}).then((heroes) => {
        res.send(heroes);
    });
});

//add hero to database
router.post('/', (req, res, next) => {
    hero.create(req.body).then((sentHeroObject) => {
        res.send(sentHeroObject);
        console.log("Saved!");
    }).catch(next);
});

module.exports = router;