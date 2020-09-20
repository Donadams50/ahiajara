const db = require("../mongoose");
const Bespokes = db.bespokes;


 const sendemail = require('../helpers/emailhelper.js');

 // Add new symptom  to category
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
    
            const savebespoke = await  skinissues.save()
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
}