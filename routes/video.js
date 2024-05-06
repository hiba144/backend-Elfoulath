const express = require('express');
const router = express.Router();
const Watch = require('../configuration/models/watch');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const date = Date.now();
        const fileName = date + '.' + file.originalname.split('.').pop(); // Extension du fichier vidéo
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

router.post('/addvideo', upload.single('video'), async (req, res) => {
    try {
        const data = req.body;
        const watch = new Watch(data);
        watch.video_path = `${process.env.BACKEND_URL}/${req.file.path}`; // Corrected path
        const savedWatch = await watch.save();
        res.status(200).send(savedWatch);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/getallwa', async (req, res) => {
    try {
        const watchs = await Watch.find();
        res.status(200).send(watchs);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delwatch/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedWatch = await Watch.findByIdAndDelete(id);
        res.status(200).send(deletedWatch);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/upwatch/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const updated = await Watch.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).send(updated);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
