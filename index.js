
const express = require('express');
const app = express();
const dataService = require('./services/data.service')

app.use(express.json());
//GET - READ
app.get('/',(req,res)=>{
    res.send("THIS IS A GET METHOD")
   // res.status(401).send("THIS IS A GET METHOD")
})

//POST - CREATE
 app.post('/',(req,res)=>{
 res.send("THIS IS A POST METHOD")
});

app.post('/register',(req,res)=>{
   // console.log(req.body)
    const result=dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
   //console.log(res.json(result)) 
   });

   app.post('/login',(req,res)=>{
    // console.log(req.body)
     const result=dataService.login(req.body.acno,req.body.pswd)
     res.status(result.statusCode).json(result)
    
    });

    app.post('/deposit',(req,res)=>{
        // console.log(req.body)
         const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
         res.status(result.statusCode).json(result)
        
        });

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
