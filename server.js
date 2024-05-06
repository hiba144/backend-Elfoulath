const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');
const lienRoute = require('./routes/lien');                               // Importer la nouvelle route pour enregistrer un lien
const adminRoute = require('./routes/admin');
const video =require('./routes/video');
require('dotenv').config()

require('./configuration/connect');

const app = express();
app.use(express.json());
                                                                         // Routes existantes
app.use('/user', userRoute);
app.use('/admin' ,adminRoute );
                                                                       // Nouvelle route pour enregistrer un lien
app.use('/lien', lienRoute);                                            // Utiliser la nouvelle route pour enregistrer un lien

                                                                       // bch njib tasswira li hajtu biha ml base drct B ID  //
app.use('/getimage', express.static('./uploads'));
app.use('/getvideo', express.static('./uploads'));
app.use('/posttvideo', express.static('./uploads'));
app.use('/video',video)
app.use(express.static('./'));
app.listen(3000, () => {
    console.log('server work');
});
