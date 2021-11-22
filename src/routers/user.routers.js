import express from 'express';
const router = express.Router();

import UserHelper from '../controller/helper/user.js';
import upload from '../middleware/upload.js'

router.get('/', UserHelper.Instance.getAll);

router.get('/:id', UserHelper.Instance.get);

router.post('/', upload, UserHelper.Instance.add);

router.patch('/:id', upload, UserHelper.Instance.edit);

router.delete('/:id', UserHelper.Instance.delete);

export default router;