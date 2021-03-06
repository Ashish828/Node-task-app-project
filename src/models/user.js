const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email pal')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6 || value === 'password'){
                throw new Error('Invalid password pal')
            }
        }
    },
    age: {
        type: Number,
        trim: true,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Invalid age pal')
            }
        }
    }
})

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new error('Login Failed.')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new error('Login Failed.')
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User