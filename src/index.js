// C:\Users\ASHISH\mongodb\bin\mongod.exe --dbpath=C:\Users\ASHISH\mongodb-data

const express = require('express')
require('./db/mongoose')
const userRouter = require('./Routers/userRouter')
const taskRouter = require('./Routers/taskRouter')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
})