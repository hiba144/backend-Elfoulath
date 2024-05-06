const mongoose = require ('mongoose');


const User = mongoose.model('user' , {

    name: {
        type: String
    },


    lastname: {
        type: String
    },

    email:{
        type: String,
        required: [true, "email is required"],
        unique:true
    },


   age :{
    type: Number
},


password:{
    type: String
}

})


module.exports = User;