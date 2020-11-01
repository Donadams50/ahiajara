
const db = require("../mongoose");
const Members = db.profiles;
const Auths = db.auths;
const Carts = db.carts;
const Feedback = db.feedbacks;
const Notifications = db.notifications;
const passwordUtils =require('../helpers/passwordUtils');
const jwtTokenUtils = require('../helpers/jwtTokenUtils.js');
const sendemail = require('../helpers/emailhelper.js');

const { signToken } = jwtTokenUtils;
const uuid = require('uuid')


// Create and Save a new User

exports.create = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
console.log(req.body)
  // let {myrefCode} = req.query;
    const {   email, password , firstName, lastName, phoneNo, username } = req.body;
  
    if ( email && password  && lastName && firstName, phoneNo ){
        if ( email==="" || password==="" || firstName==="" || lastName==="" || phoneNo===""  ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
        }else{
            
            
            const members = new Members({
                email: req.body.email.toLowerCase(),
                firstName: req.body.firstName ,
                lastName: req.body.lastName,
                phoneNo: req.body.phoneNo,
                isAdmin: false,
                isVerified: false,
                code: uuid.v4(),
                forgotPasswordCode: '',
                username: req.body.username
                
              });
              const auths = new Auths({
                email: req.body.email.toLowerCase(),
                
                
              });

         
            try{
              const isUserExist = await Members.findOne({email: email} )
              console.log(isUserExist)
               if(isUserExist){
                res.status(400).send({message:" Email already exists"})
               }else{
                auths.password = await passwordUtils.hashPassword(req.body.password.toLowerCase());
                const emailFrom = 'Ahiajara Skin care    <noreply@Ahiajara.com>';
                const subject = 'Succesful Registration link';                      
               const hostUrl = "ahiajara.netlify.app/dashboard"
                 const hostUrl2 = "https://ahiajara.netlify.app/dashboard" 
              
              
            const   text = "We're excited to have you get started. Your Registration to Ahiajara skin care  was successful."
                const emailTo = req.body.email.toLowerCase();
             const link = `${hostUrl}`;
                 const link2 = `${hostUrl2}`;
                 processEmail(emailFrom, emailTo, subject, link, link2, text, firstName);
                 const saveauth = await  auths.save()
                  console.log(saveauth)
                  if(saveauth._id){
                 const savemember = await  members.save()
                   console.log(savemember)
                   }
            res.status(201).send({message:"User  created"})
          }
                       
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating profile "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}

// Retrieve all Tutorials from the database.
exports.signIn = async(req, res) => {
  if (!req.body){
    res.status(400).send({message:"Content cannot be empty"});
}
console.log(req.body)
// let {myrefCode} = req.query;
const {   email, password  } = req.body;

if ( email && password ){
    if ( email==="" || password==="" ){
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }else{
        
        
        const members = new Members({
            email: req.body.email.toLowerCase(),
            password: req.body.password
            
          });

     
        try{
         const User = await Members.findOne({email: email} )
         const Auth = await Auths.findOne({email: email} )
         console.log(User)
           if(User){
            const retrievedPassword = Auth.password
            const id = User._id;
         const {  firstName, lastName, username, isAdmin, phoneNo, createdAt, updatedAt, isVerified, email } = User
            const isMatch = await passwordUtils.comparePassword(password.toLowerCase(), retrievedPassword);
            console.log(isMatch )
             if (isMatch){
              const tokens = signToken( id, firstName, lastName, username, isAdmin, phoneNo, createdAt, updatedAt, isVerified, email) 
            //  const Carts = db.carts;
            //const findProduct = await Products.find({_id:id}) 
            const countcart = await Carts.countDocuments({userId:id})
            let user = {}
             
                  user.profile = { id, firstName, lastName, username, isAdmin, phoneNo, createdAt, updatedAt, isVerified, email } 
                  user.token = tokens;   
                  user.cartcount = countcart             
                  res.status(200).send(user)                         
          }else{
              res.status(400).json({message:"Incorrect Login Details"})
          }
    
    
           }else{
            res.status(400).send({message:" User does not exists"})
      }
                   
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:"Error while signing in "})
        }
    }
}else{
    res.status(400).send({
        message:"Incorrect entry format"
    });
}
};

// Find all members
exports.findAllMembers = async (req, res) => {
    try{
        const{ limit}= req.query
        console.log(limit)
      const  lim = parseInt(limit)
      console.log(lim)
        if(limit){
        const findAllMembers = await Members.find({isAdmin:false}).sort({"_id": -1}).limit(lim)
        console.log(findAllMembers)
        res.status(200).send(findAllMembers)
         }else{
           const findAllMembers = await Members.find({isAdmin:false}).sort({"_id": -1})  
           console.log(findAllMembers)
        res.status(200).send(findAllMembers)
         }
        
         
                  
           
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting all users "})
       }
};


// find member by the id in the request
exports.findMembeById = async (req, res) => {
   try{
       
            let id = req.params.id
        const findMemberById = await Members.find({id: id})
       
        console.log(findMemberById)
        res.status(200).send(findMemberById)
    // }        
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting member "})
       }

};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};


exports.postFeedback = async(req, res) => {
    console.log(req.body)
    
    
          
            const feedback  = new Feedback({
                
                username:req.user.username,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                message: req.body.message
          
              });
    
         
            try{
                const findadmin = await Members.findOne({isAdmin: 'true'} )
            //  console.log(findadmin)
              console.log(findadmin.id)
              const notify = new Notifications({
                messageTo: findadmin.id,              
                read: false,
                messageFrom: req.user.id,
                messageFromFirstname: req.user.firstName,
                messageFromLastname: req.user.lastName,
                message: 'A  new feed back from '+req.user.firstName+' '+req.user.lastName+''
                
          
              });
      
              const postFeedback = await  feedback.save()
              console.log(postFeedback)
           
               if(postFeedback){
                const  notification = await  notify.save()
               res.status(201).send({message:"entry question created"})
                  
                
               }else{
                 
             
              res.status(400).send({message:"feed back not  posted"})
                
          }
                       
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while posting feedback "})
            }
        
    };



    

    exports.changeAdminPassword = async(req,res)=>{
        if (!req.body){
            res.status(400).send({message:"Content cannot be empty"});
        }
    console.log(req.body)
      // let {myrefCode} = req.query;
        const {   email, password } = req.body;
      
        if ( email && password  ){
            if ( email==="" || password===""  ){
                res.status(400).send({
                    message:"Incorrect entry format"
                });
            }else{
                
                
    
             
                try{
                  const isUserExist = await Members.findOne({email: email} )
            
                    if(isUserExist.isAdmin === true){
                    newpassword = await passwordUtils.hashPassword(req.body.password.toLowerCase());
                    console.log("newpassword")
                    console.log(newpassword)               
                    const email = req.body.email.toLowerCase();
                    const updatePassword = await Auths.findOneAndUpdate({ email }, { passsword: newpassword });
                    console.log(updatePassword)
 
                    const emailFrom = 'Ahiajara Skin care    <noreply@Ahiajara.com>';
                    const subject = 'Succesful Registration link';                      
                    const hostUrl = "ahiajara.netlify.app/dashboard"
                    const hostUrl2 = "https://ahiajara.netlify.app/dashboard"    
                    const   text = "Your password has just been changed"
                    const emailTo = req.body.email.toLowerCase();
                    const link = `${hostUrl}`;
                    const link2 = `${hostUrl2}`;
                     processEmail(emailFrom, emailTo, subject, link, link2, text, "Admin");
                      
                res.status(201).send({message:"Password changed succesfully"})
                                     
                   }
                    else{
 


                res.status(400).send({message:" Email already exists"})

              }
                           
                    
                }catch(err){
                    console.log(err)
                    res.status(500).send({message:"Error while creating profile "})
                }
            }
        }else{
            res.status(400).send({
                message:"Incorrect entry format"
            });
        }
    }
// process email one
async function processEmail(emailFrom, emailTo, subject, link, link2, text, fName){
  try{
      //create org details
      // await delay();
     const sendmail =  await sendemail.emailUtility(emailFrom, emailTo, subject, link, link2, text, fName);
   //  console.log(sendmail)
      return sendmail
  }catch(err){
      console.log(err)
      return err
  }

}

