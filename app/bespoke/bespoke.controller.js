const db = require("../mongoose");
const Bespokes = db.bespokes;
const Entrys = db.entrys;
const Members = db.profiles;
const Notifications = db.notifications;

const sendemail = require('../helpers/emailhelper.js');

//Add new symptom  to category
exports.create = async(req, res) => {
  console.log(req.body)
  // let {myrefCode} = req.query;
  const {   question, type, options  } = req.body;
  
  if ( question && type ){
      if ( question==="" || type===""){
          res.status(400).send({
              message:"Incorrect entry format"
          });
      }else{
        
          const bespoke = new Bespokes({
            question: req.body.question,
            type: req.body.type,
            options: req.body.options
              
        
            });
  
       
          try{
    
            const savebespoke = await  bespoke.save()
            console.log(savebespoke)
         
             if(savebespoke){
             res.status(201).send({message:"bespoke question created"})
                
              
             }else{
               
           
            res.status(400).send({message:"bespoke question not  created"})
              
        }
                     
              
          }catch(err){
              console.log(err)
              res.status(500).send({message:"Error while creating question "})
          }
      }
  }else{
      res.status(400).send({
          message:"Incorrect entry format"
      });
  }
};

exports.findQuestions = async (req, res) => {
    try{
       ;
        const findQuestions = await Bespokes.find().sort({ _id: "desc" })
        console.log(findQuestions)
        res.status(200).send(findQuestions)
         
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting questions "})
       }
};

exports.update = async (req, res) => {
    const _id = req.params.id;
    const bespoke = new Bespokes({
         _id : req.params.id,
        question: req.body.question,
        type: req.body.type,
        options: req.body.options
          
    
        });
       try{


                        const updateBespoke = await Bespokes.updateOne( {_id}, bespoke)
                           console.log(updateBespoke)
                        //   const getProduct = await Products.findOne({_id:_id})
                        if(updateBespoke.nModified === 1){
                           res.status(200).send({message:"Bespoke updated "})
                        } else{
                            res.status(400).send({message:"Bespoke not updated "})
                        }
                        }
                    catch(err){
                            console.log(err)
                            res.status(500).send({message:"Error while updating Bespoke "})
                        }
};

exports.deleteQuestion = async (req, res) => {
    try{
        const id = req.params.id;
        const deleteQuestions = await Bespokes.findByIdAndRemove(id)
        console.log(deleteQuestions)
        res.status(200).send(deleteQuestions)
         
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting questions "})
       }
};

exports.getEntry = async (req, res) => {
    try{
       
        const findEntries = await Entrys.find().sort({ _id: "desc" })
        console.log(findEntries)
        res.status(200).send(findEntries)
         
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting Entries "})
       }
};

exports.getSingleEntry = async (req, res) => {
    try{
       
        console.log(req.params.id)
        
           let id = req.params.id
       const findSingleEntry = await Entrys.findOne({_id: id})
       console.log(findSingleEntry)
       
       
       res.status(200).send(findSingleEntry)
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting Entries "})
       }
};

exports.reply = async(req, res) => {
    const { reply } = req.body;
    if ( reply===""){
            res.status(400).send({
                message:"Incorrect entry format"
            });
    }else{      
        try{
            const _id = req.params.id;
            const updateEntry = await Entrys.findOneAndUpdate({ _id }, { reply: req.body.reply });
            console.log(updateEntry)
            const findEntrys =  await Entrys.findOne({_id: _id} )
            const findMemberByEmail = await Members.findOne({email: findEntrys.email})
            const notify = new Notifications({
            messageTo: findMemberByEmail._id,              
            read: false,
            messageFrom: req.user.id,
            messageFromFirstname: "Admin",
            messageFromLastname: "Admin",
            message: reply
            });
            const  notification = await  notify.save()

                const emailFrom = 'Ahiajara Skin care    <noreply@Ahiajara.com>';
                const subject = 'Notification';                      
                const hostUrl = "ahiajara.com/dashboard"
                const hostUrl2 = "https://ahiajara.com/dashboard" 
                const   text = reply
                const emailTo = findEntrys.email.toLowerCase();
                const link = `${hostUrl}`;
                const link2 = `${hostUrl2}`;
                const firstName = findMemberByEmail.firstName
                processEmail(emailFrom, emailTo, subject, link, link2, text, firstName);
            res.status(200).send({message:"Reply was saved  succesfully"})
        }catch(err){
            console.log(err)
            res.status(500).send({message:"Error while completing order "})
        }
    }
};

exports.postEntry = async(req, res) => {
    console.log(req.body.bespokeAnswers)
   
        console.log(req.file.url)
          
            const entrys = new Entrys({
                entryCode: getReferralCode(),
                username:req.user.username,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                questionAndAnswer : JSON.parse(req.body.bespokeAnswers),
                reply: "",
                imgUrl: req.file.url
          
              });
               
         
            try{
      
              const saveentry = await  entrys.save()
              console.log(saveentry)
           
               if(saveentry){
               res.status(201).send({message:"entry question created"})
                  
                
               }else{
                 
             
              res.status(400).send({message:"entry question not  created"})
                
          }
                       
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating question "})
            }
       
};

function getReferralCode(){
    var numbers = "0123456789";

    var chars= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    var code_length = 7;
    var number_count = 3;
    var letter_count = 4;
    
    var code = '';
    
    for(var i=0; i < code_length; i++) {
        var letterOrNumber = Math.floor(Math.random() * 2);
        if((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
            letter_count--;
            var rnum = Math.floor(Math.random() * chars.length);
            code += chars[rnum];
        }
        else {
            number_count--;
            var rnum2 = Math.floor(Math.random() * numbers.length);
            code += numbers[rnum2];
        }
    }
return code
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