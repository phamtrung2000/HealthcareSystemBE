import express from "express";
const router = express.Router();

import BadgeHelper from "../controller/helper/badge.js"

router.get('/', BadgeHelper.Instance.getAll);

router.get('/:id', BadgeHelper.Instance.get);

//Get badge(s) by userId -> need review
router.get('/userid/:id', BadgeHelper.Instance.getByUserId);

router.post('/', BadgeHelper.Instance.add);

//Edit (just chilling here, not expected to be used)
router.patch('/:id', BadgeHelper.Instance.edit);

router.delete('/:id', BadgeHelper.Instance.delete);

//Delete badge(s) by userId
router.delete('/userid/:id', BadgeHelper.Instance.deleteByUserId);

export default router;