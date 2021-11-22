import ModelHelper from "./base/model.js";
import User from "../../models/user.model.js";
import Badge from '../../models/badge.model.js';
import DailyCheckin from '../../models/daily_checkin.model.js';
import mongoose from "mongoose";
import moment from "moment";

class UserHelper extends ModelHelper {
    static get Instance() {
        if (!UserHelper.instance) {
            UserHelper.instance = new UserHelper(User, 'User');
        }
        return UserHelper.instance;
    }

    add = async (req, res) => {
        let newUser = new User(req.body);
        newUser.yearOld = moment().diff(moment(newUser.dateOfBirth), 'years');
        newUser.avatar = req.file.path;
        try {
            await newUser.save();
            res.status(201).send({
                msg: "OK!",
                detail: "",
                data: newUser
            });
        } catch (err) {
            res.status(400).send({
                msg: "INVALID DATA!",
                detail: err.message
            });
        }
    }

    edit = async (req, res) => {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                msg: `INVALID ID: ${id}`,
                detail: "Must match bson ObjectId!"
            });
        }

        try {
            req.body.yearOld = moment().diff(moment(req.body.dateOfBirth), 'years');
            if (req.file) {
                req.body.avatar = req.file.path;
            }
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });

            if (updatedUser) {
                res.status(201).send({
                    msg: "OK!",
                    detail: "",
                    data: updatedUser
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No user with id of ${id} exists!`,
                    data: updatedUser
                });
            }
        } catch (err) {
            res.status(400).send({
                msg: "INVALID DATA!",
                detail: err.message
            });
        }
    }

    delete = async (req, res) => {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                msg: `INVALID ID: ${id}`,
                detail: "Must match bson ObjectId!"
            });
        }

        try {
            await Promise.all([Badge.deleteMany({ user: id }), DailyCheckin.deleteMany({ user: id })]);
            const deletedUser = await User.findByIdAndRemove(id);
            if (deletedUser) {
                res.status(200).send({
                    msg: "OK!",
                    detail: "",
                    data: deletedUser
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No user with id of ${id} exists!`,
                    data: deletedUser
                });
            }

        } catch (err) {
            res.status(400).send({
                msg: "INVALID DATA!",
                detail: err.message
            });
        }
    }
}

export default UserHelper;