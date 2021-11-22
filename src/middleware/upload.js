import fs from 'fs';
import path from 'path';
import multer from 'multer';
import moment from "moment";
import Config from '../utils/config.js';

function deleteOldAvatar(req) {
    const uploadDir = path.join(Config.Instance.UploadBaseDir, `${req.id}`);
    if (fs.existsSync(uploadDir)) {
        fs.readdirSync(uploadDir).forEach((file) => {
            fs.rmSync(path.join(uploadDir, file));
        });
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadDir = path.join(Config.Instance.UploadBaseDir, `${req.id}`);
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        callback(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, moment() + '-' + file.originalname);
    }
});


const filter = function (req, file, callback) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const supExts = Config.Instance.SupportedExtensions;
    supExts.every((ext, index) => {
        if (ext === fileExt) {
            if (Config.Instance.DeleteOldAvatar) {
                deleteOldAvatar(req);
            }

            callback(null, true);
            return false;
        }
        else if (index === supExts.length - 1) {
            callback(new Error('Only accepts: jpeg, jpg, png'), false);
        }
        else {
            return true;
        }
    });
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: filter

}).single(Config.Instance.AvatarFieldName);

export default upload;