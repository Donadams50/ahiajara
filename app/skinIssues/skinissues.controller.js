const db = require("../mongoose");
const Skinissues = db.skinissues;
const Symptoms = db.symptoms;

 const sendemail = require('../helpers/emailhelper.js');

 // Add new symptom  to category
exports.createSymptom = async(req, res) => {
  console.log(req.body)
  // let {myrefCode} = req.query;
  const {   category, symptom  } = req.body;
  
  if ( category && symptom ){
      if ( category==="" || symptom===""){
          res.status(400).send({
              message:"Incorrect entry format"
          });
      }else{
  
        
          const symptoms = new Symptoms({
              category: req.body.category,
              symptom: req.body.symptom
              
        
            });
  
       
          try{
           const isSymptomExist = await Symptoms.findOne({symptom: symptom} )
           console.log(isSymptomExist)
             if(isSymptomExist){
             
                res.status(400).send({message:"Symptom already  exists"})
              
             }else{
               
                const savesymptom = await symptoms.save()
                console.log(savesymptom)
               res.status(201).send({message:"symptom created"})
              
        }
                     
              
          }catch(err){
              console.log(err)
              res.status(500).send({message:"Error while creating symptom "})
          }
      }
  }else{
      res.status(400).send({
          message:"Incorrect entry format"
      });
  }
  };

 


exports.findSymptoms = async (req, res) => {
    try{
        console.log(req.params.category)
         let category = req.params.category;
        const findSymptoms = await Symptoms.find({category:category}).sort({ _id: "desc" })
        console.log(findSymptoms)
        res.status(200).send(findSymptoms)
         
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting symptoms "})
       }
}

exports.createSkinIssue = async(req, res) => {
  console.log(req.body)
  // let {myrefCode} = req.query;
  const {   name, description, category, symptom  } = req.body;
  
  if ( category && symptom && name && description){
      if ( category==="" || symptom==="" || name ==="" || description ===""){
          res.status(400).send({
              message:"Incorrect entry format"
          });
      }else{
    // console.log(req.file)
    // console.log( JSON.stringify( req.file.url ) ) 
        
          const skinissues = new Skinissues({
              category: req.body.category,
              imgUrl: req.file.url,
              symptom: req.body.symptom,
               name: req.body.name,
              description: req.body.description     
            });
  
       
          try{
           const isSkinIssueExist = await Skinissues.findOne({name: name} )
           console.log(isSkinIssueExist)
             if(isSkinIssueExist){
             
                res.status(400).send({message:"Skin issue already  exists"})
              
             }else{
               
                const saveskinissue = await  skinissues.save()
                console.log(saveskinissue)
               res.status(201).send({message:"Skin issue  created"})
              
        }
                     
              
          }catch(err){
              console.log(err)
              res.status(500).send({message:"Error while creating Skin issue "})
          }
      }
  }else{
      res.status(400).send({
          message:"Incorrect entry format"
      });
  }
  };

  
    // Find all products 
exports.findSkinIssue = async (req, res) => {
    try{
        console.log()
      
        const resultsPerPage =  parseInt(req.query.limit);
        const offset1 = parseInt(req.query.offset);
        console.log(resultsPerPage)
        console.log(offset1)
        if(offset1 === 1){
            const findAllSkinIssue = await Skinissues.find().sort({ _id: "desc" })
            .limit(resultsPerPage)
            console.log(findAllSkinIssue)
            res.status(200).send(findAllSkinIssue)
        }else{
            const page = offset1 -1;
        const findAllSkinIssue = await Skinissues.find().sort({ _id: "desc" })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        console.log(findAllSkinIssue)
        res.status(200).send(findAllSkinIssue)
    }        
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting all skin issue "})
       }
};