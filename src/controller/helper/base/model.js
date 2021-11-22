import mongoose from "mongoose";

class ModelHelper {
    constructor(model, name) {
        this.model = model;
        this.name = name;
    }

    getAll = async (req, res) => {
        try {
            const docs = await this.model.find();
            if (docs.length != 0) {
                res.status(200).send({
                    msg: "OK!",
                    detail: `Total of ${docs.length} ${this.name}(s).`,
                    data: docs
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No ${this.name}s exist!`,
                    data: docs
                });
            }

        } catch (err) {
            res.status(400).send({
                msg: "ERROR!",
                detail: err.message
            });
        }
    }

    get = async (req, res) => {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                msg: `INVALID ID: ${id}`,
                detail: "Must match bson ObjectId!"
            });
        }

        try {
            const doc = await this.model.findById(id);
            if (doc) {
                res.status(200).send({
                    msg: "OK!",
                    detail: "",
                    data: doc
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No ${this.name} with id of ${id} exists!`,
                    data: doc
                });
            }

        } catch (err) {
            res.status(400).send({
                msg: "ERROR!",
                detail: err.message
            });
        }
    }

    getByUserId = async (req, res) => {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(id);
            return res.status(400).send({
                msg: `INVALID ID: ${id}`,
                detail: "Must match bson ObjectId!"
            });
        }

        try {
            const docs = await this.model.find({ user: id });
            if (docs.length != 0) {
                res.status(200).send({
                    msg: "OK!",
                    detail: `Total of ${docs.length} ${this.name}(s).`,
                    data: docs
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No ${this.name}(s) with id of ${id} exist!`,
                    data: docs
                });
            }

        } catch (err) {
            res.status(400).send({
                msg: "ERROR!",
                detail: err.message
            });
        }
    }

    add = async (req, res) => {
        console.log(req.body.user);
        let newDoc = new this.model(req.body);

        try {
            await newDoc.save();
            res.status(201).send({
                msg: "OK!",
                detail: "",
                data: newDoc
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
            const updatedDoc = await this.model.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });

            if (updatedDoc) {
                res.status(201).send({
                    msg: "OK!",
                    detail: "",
                    data: updatedDoc
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No ${this.name} with id of ${id} exists!`,
                    data: updatedDoc
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
            const deletedDoc = await this.model.findByIdAndRemove(id);
            if (deletedDoc) {
                res.status(200).send({
                    msg: "OK!",
                    detail: "",
                    data: deletedDoc
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No ${this.name} with id of ${id} exists!`,
                    data: deletedDoc
                });
            }
        } catch (err) {
            res.status(400).send({
                msg: "INVALID DATA!",
                detail: err.message
            });
        }
    }

    deleteByUserId = async (req, res) => {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                msg: `INVALID ID: ${id}`,
                detail: "Must match bson ObjectId!"
            });
        }

        try {
            const docs = await this.model.deleteMany({ user: id });
            if (docs.deletedCount != 0) {
                res.status(200).send({
                    msg: "OK!",
                    detail: `Total of ${docs.deletedCount} ${this.name}(s) deleted.`,
                });
            }
            else {
                res.status(404).send({
                    msg: "NOT FOUND!",
                    detail: `No ${this.name} with id of ${id} exists!`,
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
export default ModelHelper;