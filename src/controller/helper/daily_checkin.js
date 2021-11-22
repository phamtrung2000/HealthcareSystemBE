import DailyCheckin from '../../models/daily_checkin.model.js';
import ModelHelper from "./base/model.js";
import mongoose from "mongoose";
import moment from "moment";

class DailyCheckinHelper extends ModelHelper {
    static get Instance() {
        if (!DailyCheckinHelper.instance) {
            DailyCheckinHelper.instance = new DailyCheckinHelper(DailyCheckin, 'DailyCheckin');
        }
        return DailyCheckinHelper.instance;
    }

    add = async (req, res) => {
        let newDailyCheckin = new DailyCheckin(req.body);

        const dailyCheckinSameUsers = await DailyCheckin.find({ user: req.body.user });

        for (let index = 0; index < dailyCheckinSameUsers.length; index++) {
            if (moment(newDailyCheckin.date).isSame(moment(dailyCheckinSameUsers[index].date), 'day')) {
                return res.status(400).send({
                    msg: "INVALID DATA!",
                    detail: "Same date!"
                });
            }
        }

        try {
            await newDailyCheckin.save();
            res.status(201).send({
                msg: "OK!",
                detail: "",
                data: newDailyCheckin
            });
        } catch (err) {
            res.status(400).send({
                msg: "INVALID DATA!",
                detail: err.message
            });
        }
    }
}

export default DailyCheckinHelper;