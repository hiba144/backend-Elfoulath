const express = require('express');
const router = express.Router();
const Lien = require('../configuration/models/lien');

router.post('/addlien', async (req, res) => {
    try {
        const { url } = req.body;
        const nouveauLien = new Lien({ url });
        await nouveauLien.save();
        res.status(201).json(nouveauLien);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'ajout du lien." });
    } 
});

// Route pour récupérer tous les utilisateurs
router.get('/alllien', async (req, res) => {
    try {
        const lien = await Lien.find();
        res.json(lien);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
