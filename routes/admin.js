const express = require('express');
const router = express.Router();
const admin = require('../configuration/models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel administrateur

router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const newadmin = new admin(data);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        newadmin.password = hashedPassword;

        const savedadmin = await newadmin.save();
        res.status(200).send(savedadmin);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Authentification de l'administrateur
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const adminuser = await admin.findOne({ email });

        if (!adminuser) {
            return res.status(404).send('Email invalide !');
        }

        const validPassword = await bcrypt.compare(password, adminuser.password);

        if (!validPassword) {
            return res.status(401).send('Mot de passe invalide !');
        }

        const payload = {
            _id: adminuser._id,
            email: adminuser.email,
            name: adminuser.name
        };

        const token = jwt.sign(payload, '12345678'); // Replace '12345678' with your own secret key

        res.status(200).send({ token });
    } catch (err) {
        console.log(err.messge)
        res.status(500).send('Erreur du serveur');
    }
});


// Recherche d'un administrateur par email
router.get('/trouvebyemail/:email', (req, res) => {
    const email = req.params.email;

    admin.findOne({ email })
        .then(admin => {
            res.send(admin);
        })
        .catch(err => {
            res.send(err);
        });
});

// Suppression d'un administrateur par email
router.delete('/del/:email', (req, res) => {
    const email = req.params.email;

    admin.findOneAndDelete({ email })
        .then(deletedadmin => {
            res.send(deletedadmin);
        })
        .catch(err => {
            res.send(err);
        });
});

// Mise à jour d'un administrateur par email
router.put('/update/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const newData = req.body;

        if (newData.password) {
            const salt = bcrypt.genSaltSync(10);
            newData.password = await bcrypt.hash(newData.password, salt);
        }

        const updatedAdmin = await admin.findOneAndUpdate({ email: email }, newData, { new: true });

        if (!updatedAdmin) {
            return res.status(404).send("Administrateur non trouvé.");
        }

        res.send(updatedAdmin);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;
