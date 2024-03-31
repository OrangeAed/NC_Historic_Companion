import express from 'express';
import ApiCtrl from '../controllers/api';

const router = express.Router();
const apiCtrl = new ApiCtrl();

router.route('/tours')
    .get(apiCtrl.getAllTours);

export default router;