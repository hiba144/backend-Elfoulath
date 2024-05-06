const express = require('express');
const router = express.Router();
const User = require('../configuration/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

///ajout :nasna3 user w naaml mtp crypter //

// Assurez-vous que vous importez le modèle d'utilisateur une seule fois

router.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        // Créer un nouvel utilisateur avec les données de la requête
        const newUser = new User({
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
            age: userData.age,
            password: userData.password
        });

        // Hacher le mot de passe avant d'enregistrer l'utilisateur
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        newUser.password = hashedPassword;

        // Enregistrer le nouvel utilisateur dans la base de données
        const savedUser = await newUser.save();

        // Envoyer la réponse avec le nouvel utilisateur créé
        res.status(201).send(savedUser);
    } catch (err) {
        // Gérer les erreurs lors de l'enregistrement de l'utilisateur
        res.status(400).send(err.message);
    }
});


//login :ntetssti kn mawjoudin wela lee f base de donnee//
router.post('/mtp', async (req, res) => {
    try {
        const data = req.body;

        // Find user by email
        const user = await User.findOne({ email: data.email });
        if (!user) {
            // If user not found, respond with 404
            return res.status(404).send('Email is invalid!');
        }

        // Compare password
        const validPass = bcrypt.compareSync(data.password, user.password);
        if (!validPass) {
            // If password is invalid, respond with 404
            return res.status(404).send('Password is invalid!');
        }

        // Create JWT payload
        const payload = {
            _id: user._id,
            email: user.email,
            name: user.name
        };

        // Sign token
        const token = jwt.sign(payload, '12345678');

        // Respond with token
        res.status(200).send({ mytoken: token });
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(404).send('Server Error');
    }
});


    
    /////**** recherche :ki bech nlawej aala user b email drct ml postman ne5ou baad getall/ w n7ot email
    ////naaml qbalha request hethy
    
    router.get('/getbyemail/:email' , (req,res)=>{
        myemail=req.params.email;
    
        User.findOne({email: myemail})    ///findone yaanni bch ylawajli aala object wehed khw li aandou id li hatytou f postman
        .then(
            (user) =>{
                res.send(user)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
    
    })
    //////////****delete: lena ki n7b nfassa5
    
    router.delete('/delete/:email', (req, res)=>{     /////kol mene5dem b parametre mou3ayen n7ot /: essm parametre
        email=req.params.email   //taqra id ml request
    User.findOneAndDelete({email:email})  //bin {} n7ot condition kn bqat fer4a raw owel wehed yo3rodhou bch yfass5ou
    .then(
        (deleteduser)=>{
            res.send(deleteduser)
        }
    )  //////kn tfassa5 tabaathli l aabd li tfassa5
    .catch(
        (err)=>{
            res.send(err)
        }   //// kn lee tebaathli l erreur
    )
    })
    
    /////****update: bech naaml update w nrajaa mtp crypter*/
    
    router.put('/update/:email', async (req, res) => {
        try {
            const email = req.params.email;
            const newData = req.body;
    
            if (newData.password) {
                const salt = bcrypt.genSaltSync(10);
                newData.password = await bcrypt.hash(newData.password, salt);
            }
    
            const updatedUser = await User.findOneAndUpdate({ email: email }, newData, { new: true });
    
            if (!updatedUser) {
                return res.status(404).send("Utilisateur non trouvé.");
            }
    
            res.send(updatedUser);
        } catch (err) {
            res.status(400).send(err.message);
        }
    });

// Route pour récupérer tous les utilisateurs
router.get('/all', async (req, res) => {
    try {
        const utilisateurs = await User.find();
        res.json(utilisateurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;