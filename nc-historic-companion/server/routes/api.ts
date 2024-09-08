import express from 'express';
import ApiCtrl from '../controllers/api.ts';
import multer from 'multer';

const router = express.Router();
const apiCtrl = new ApiCtrl();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/photos/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.route('/tours')
    .get(apiCtrl.getAllTours)
    .post(apiCtrl.addTour);

router.route('/tours/:id')
    .get(apiCtrl.getTour)
    .delete(apiCtrl.deleteTour);

router.post('/upload', upload.single('image'), apiCtrl.uploadImage);

export default router;