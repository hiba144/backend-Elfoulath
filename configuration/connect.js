const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dbpfe')
.then(
    ()=>{
        {
            console.log('connected');
        }
    }
)
.catch(
    (err)=>{
        console.error(err);
    }
)


module.exports = mongoose;