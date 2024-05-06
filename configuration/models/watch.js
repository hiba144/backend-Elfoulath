const mongoose = require ('mongoose');


const watch = mongoose.model('watch' , {
video_path:{
        type:String
},

})


module.exports = watch;