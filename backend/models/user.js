import mongoose from 'mongoose';


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const users = new mongoose.model('user', userSchema);

// module.exports=users;
export default users;