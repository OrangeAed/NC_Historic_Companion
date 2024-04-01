import express from 'express';
import ApiCtrl from '../controllers/api';

const router = express.Router();
export const apiCtrl = new ApiCtrl();

router.route('/tours')
    .get(apiCtrl.getAllTours)
    .post(apiCtrl.addTour);

router.route('/tours/:id')
    .get(apiCtrl.getTour)
    .delete(apiCtrl.deleteTour);

export default router;