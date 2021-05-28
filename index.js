
const express = require('express');
const app = express();
const session = require('express-session');
const dataService = require('./services/data.service')

app.use(express.json());
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));
//GET - READ

//middleware 1.using callback fun
app.use((req,res,next)=>{
    console.log("Middleware");
    next();
})
//middleware  1.separate fun
const logMiddleware=(req,res,next)=>{
    console.log(req.body);
    next();
}
//call it using app.use . it is used here globally
app.use(logMiddleware);

//middleware 3.route specific => for getting the current user who is loged in, pass it to both in deposit & withdraw
const authMiddleware=(req,res,next)=>{
    
    if(!req.session.currentUser){
        return res.json({ 
          statusCode:401,
      status:false,
      message:"pls log in"
       })
      }
      else{
          next();
      }
}

app.get('/',(req,res)=>{
    res.send("THIS IS A GET METHOD")
   // res.status(401).send("THIS IS A GET METHOD")
})

//POST - CREATE
 app.post('/',(req,res)=>{
 res.send("THIS IS A POST METHOD")
});

//POST - register
app.post('/register',(req,res)=>{
   // console.log(req.body)
    const result=dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
   //console.log(res.json(result)) 
   });
//POST - login
   app.post('/login',(req,res)=>{
    // console.log(req.body)
     const result=dataService.login(req,req.body.acno,req.body.pswd)
     res.status(result.statusCode).json(result)
    
    });

    app.post('/deposit',authMiddleware,(req,res)=>{            //middleware is used ith the req
        // console.log(req.body)
        
         const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
         res.status(result.statusCode).json(result)
        
        });

        app.post('/withdraw',authMiddleware,(req,res)=>{
            // console.log(req.body)
           
             const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
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
