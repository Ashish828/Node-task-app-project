const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks',async(req,res)=>{

    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.get('/tasks',async(req,res)=>{

    try{
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send()
    }
})


router.get('/tasks/:id',async(req,res)=>{

    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
    
})

router.patch('/tasks/:id', async(req,res)=>{
    const taskKeys = Object.keys(req.body)
    const validKeys = ['description','completed']
    taskKeys.forEach((taskKey)=>{
        if(!validKeys.includes(taskKey)){
            return res.status(400).send({error:'Invalid Validation'})
        }
    })

    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        taskKeys.forEach((taskKey)=>task[taskKey] = req.body[taskKey])
        await task.save()
        
        //const task = await Task.findByIdAndUpdate(_id,taskUpdate,{ new: true , runValidators: true})
        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }

})

router.delete('/tasks/:id',async(req,res)=>{

    const _id = req.params.id

    try{
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
    
})

module.exports = router