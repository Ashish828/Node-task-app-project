const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users',async (req,res)=>{

    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }

})

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send()
    }
})


router.get('/users', async (req,res)=>{

    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(e){
        res.status(500).send()
    }
})


router.get('/users/:id',async (req,res)=>{

    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)

    }catch(e){
        res.status(500).send()
    }
    
})

router.patch('/users/:id',async (req,res)=>{
    const userKeys = Object.keys(req.body)
    const validKeys = ['email','name','age','password']
    userKeys.forEach((userKey)=>{
        if(!validKeys.includes(userKey)){
            return res.status(400).send({error:'Invalid Validation'})
        }
    })

    const _id = req.params.id

    try{
        const user = await User.findById(_id)

        userKeys.forEach((userKey)=> user[userKey] = req.body[userKey])

        await user.save()
        // const user = await User.findByIdAndUpdate(_id,userUpdate,{new: true , runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(400).send()
    }
})

router.delete('/users/:id',async (req,res)=>{

    const _id = req.params.id

    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)

    }catch(e){
        res.status(500).send()
    }
    
})

module.exports = router