const db = require('./db')

let currentUser;
let accountDetails = {
    1000: { acno: 1000,  username: "userone", password: "userone", balance: 50000 },
    1001: { acno: 1001,  username: "usertwo", password: "usertwo", balance: 5000 },
    1002: { acno: 1002,  username: "userthree", password: "userthree", balance: 10000 },
    1003: { acno: 1003,  username: "userfour", password: "userfour", balance: 6000 }
  };

 const register=(uname,acno,pswd)=>{
   /*  var user=accountDetails;
     if(acno in user){
      
       return {
           statusCode:422,
           status:false,
           message:"User exist"
     }
    }
     else{
       user[acno]={
         acno,
         username:uname,
         password:pswd,
         balance:0
       }
       
       return{
        statusCode:200,
           status:true,
           message:"successfully registered"
       }
     }
    */
       return db.User.findOne({acno})
       .then(user=>{
         if(user){
        return {
          statusCode:422,
          status:false,
          message:"User exist"
        }
      }
        else{
         const newUser=new db.User({
            acno,
            username:uname,
            password:pswd,
            balance:0
          })
          newUser.save();
           
       return{
        statusCode:200,
           status:true,
           message:"successfully registered"
       }
        }
       })

    }
    const login=(req,acno,password)=>{
      var acno=parseInt(acno);
      return db.User.findOne({acno,password})
      .then(user=>{
        if(user){
          req.session.currentUser=user.acno;
             
          return{
            statusCode:200,
               status:true,
               message:"successfully login",
               name:user.username,
               acno:user.acno
           }
        }
        else{
          return{
            statusCode:422,
              status:false,
              message:"Invalid credentials"
          }
        }
      })

       /*  var users=accountDetails;
          if(acno in users){
            if (pswd == users[acno]["password"]) {
              req.session.currentUser=users[acno];
             
              return{
                statusCode:200,
                   status:true,
                   message:"successfully login"
               }
             
            }
            else{
              return{
                 statusCode:422,
                   status:false,
                   message:"Incorrect password or username"
               }
             
            }
          }
          else{
            return{
                statusCode:422,
                  status:false,
                  message:"Invalid account"
              }
          } */
        }

        const checkBalance=(acno,password)=>{

        
          return db.User.findOne({acno,password})
          .then(user=>{
            if(!user){
              return { 
                statusCode:422,
            status:false,
            message:"invalid credentials"
             }
            }
            else{
              return{
                statusCode:200,
                status:true,
                balance:user.balance,
                message:`Available balance ${user.balance}`
             }
            }
          })

        }
  

       const deposit=(acno,password,amount)=>{

        amount=parseInt(amount);
        return db.User.findOne({acno,password})
        .then(user=>{
          if(!user){
            return { 
              statusCode:422,
          status:false,
          message:"invalid credentials"
           }
          }
          else{
            user.balance+=amount;
            user.save();
            return{
              statusCode:200,
              status:true,
              balance:user.balance,
              message:"your account has been credited with amount:" +amount+ ",current bal: "+user.balance
           }
          }
        })

       /* 
            var user=accountDetails;
            amt=parseInt(amt);
           
            if(acno in user){

              if(pwd == user[acno]["password"]){
               
                user[acno]["balance"]+=amt;
               
                 return{
                    statusCode:200,
                    status:true,
                    balance:user[acno]["balance"],
                    message:`your account has been credited with amount: ${amt} ,current bal: ${user[acno]["balance"]}`
                 }
              }
              else{
              
                return { 
                    statusCode:422,
                status:false,
                message:"invalid username or password"
                 }
               }
            }
            else{
             
              return { 
                statusCode:422,
            status:false,
            message:"invalid account number"
             }
            } */

           
            
          }

          const transfer=(req,acno,password,t_acno,amt)=>{

          
            } 
          
          

         const withdraw=(req,acno,password,amt)=>{
          amt=parseInt(amt);
          return db.User.findOne({acno,password})
          .then(user=>{
            if(!user){
              return { 
                statusCode:422,
            status:false,
            message:"invalid credentials"
             }
            }
            if(req.session.currentUser != acno){
               return { 
                statusCode:422,
               status:false,
               message:"Permission denied"
               }
            }
            else{
              if(user.balance>amt){
                user.balance-=amt;
                user.save();
                return{
                  statusCode:200,
                  status:true,
                  balance:user.balance,
                  message:`your account has been withdrawn with amount: ${amt} ,current bal: ${user.balance}`
               }
              }
              else{
                return { 
                  statusCode:422,
              status:false,
              message:"You account balance is low"
               }
              }
            }
          })

           /*  var user=accountDetails;
             amt=parseInt(amt);
            if(acno in user){
              if(pwd == user[acno]["password"]){
                
                  if(user[acno]["balance"]>amt){
                    user[acno]["balance"]-=amt;
                  
                   
                    return{
                        statusCode:200,
                        status:true,
                        balance:user[acno]["balance"],
                        message:`your account has been withdrawn with amount: ${amt} ,current bal: ${user[acno]["balance"]}`
                     }
                  }
                  else{
                    
                    return { 
                        statusCode:422,
                    status:false,
                    message:"You account balance is low"
                     }
                  }
          }
          else{
               
            return { 
                statusCode:422,
            status:false,
            message:"invalid username or password"
             }
           }
        }
        else{
         
          return { 
            statusCode:422,
        status:false,
        message:"invalid account number"
         }
        } */
        }

        const deleteAccDetails=(acno)=>{
          return db.User.deleteOne({acno})
            .then(user=>{
            if(!user){
              return { 
                statusCode:422,
            status:false,
            message:"operation failed"
             }
            }
            else{
              return{
                statusCode:200,
                status:true,
                message:"your account " +acno +"deleted"
            }
          }
          })
        }

     module.exports={
       register,
       login,
       checkBalance,
       deposit,
       withdraw,
       transfer,
       deleteAccDetails
   }
