
const express = require('express');
const app = express();

//GET - READ
app.get('/',(req,res)=>{
    res.send("THIS IS A GET METHOD")
   // res.status(401).send("THIS IS A GET METHOD")
})

//POST - CREATE
 app.post('/',(req,res)=>{
 res.send("THIS IS A POST METHOD")
}) 

//PUT - UPDATE/MODIFY ALL
app.put('/',(req,res)=>{
    res.send("THIS IS A PUT METHOD")
   }) 

//PATCH - UPDATE/MODIFY PARTIALLY
app.patch('/',(req,res)=>{
    res.send("THIS IS A PATCH METHOD")
   }) 

//DELETE - DLT
app.delete('/',(req,res)=>{
    res.send("THIS IS A DELETE METHOD")
   })  

app.listen(3000,()=>{
    console.log("server started at port : 3000")
})
