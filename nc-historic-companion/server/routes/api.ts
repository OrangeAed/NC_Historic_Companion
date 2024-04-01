import express from 'express';
import ApiCtrl from '../controllers/api';

const router = express.Router();
export const apiCtrl = new ApiCtrl();

router.route('/tours')
    .get(apiCtrl.getAllTours);

router.route('/tours/:id')
    .get(apiCtrl.getTour);

export default router;