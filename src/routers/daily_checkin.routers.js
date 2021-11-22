import express from "express";
const router = express.Router();

import DailyCheckinHelper from "../controller/helper/daily_checkin.js";

router.get('/', DailyCheckinHelper.Instance.getAll);

router.get('/:id', DailyCheckinHelper.Instance.get);

//Get dailyCheckin(s) by userId -> need review
router.get('/userid/:id', DailyCheckinHelper.Instance.getByUserId);

router.post('/', DailyCheckinHelper.Instance.add);

//Edit (pls dont edit date, should delete then add new)
router.patch('/:id', DailyCheckinHelper.Instance.edit);

router.delete('/:id', DailyCheckinHelper.Instance.delete);

//Delete dailyCheckin(s) by userid -> need review
router.delete('/userid/:id', DailyCheckinHelper.Instance.deleteByUserId);

export default router;