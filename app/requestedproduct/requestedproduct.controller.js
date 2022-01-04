const db = require("../mongoose");
const Requestedproducts = db.requestedproducts;
const Notifications = db.notifications;
const Members = db.profiles;
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Bulkpay backend' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

const sendemail = require('../helpers/emailhelper.js');

exports.create = async(req, res) => {
    console.log(req.body)
    logger.log({
        level: 'info',
        message: 'The body of the message',
        body: req.body,
        time :  new Date()
      });
      logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    const {   productId, userId, quantitySelected  } = req.body;
    
    if ( productId && userId && quantitySelected ){
        if ( productId==="" || userId==="" || quantitySelected==="" ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
   logger.log({
    level: 'error',
    message:"Incorrect entry format",
    
    time :  new Date()

  });
       logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
        }else{
    
          
            const requestedproduct = new Requestedproducts({
                productId: req.body.productId,
                userId: req.user.id,
                quantitySelected: req.body.quantitySelected,
                firstName:req.user.firstName,
                lastName:req.user.lastName,
                email:req.user.email,
                phoneNo:req.user.phoneNo,
                reply: " "
                
          
              });
              
    
         
            try{
              const findadmin = await Members.findOne({isAdmin: 'true'} )
              console.log(findadmin)
              console.log(findadmin.id)
              const notify = new Notifications({
                messageTo: findadmin.id,              
                read: false,
                messageFrom: req.user.id,
                messageFromFirstname: req.user.firstName,
                messageFromLastname: req.user.lastName,
                message: 'A new product request from '+req.user.firstName+' '+req.user.lastName+''
                
          
              });
              const  requestedProduct = await  requestedproduct.save()
           
               if(requestedProduct._id){
                const  requestedProduct = await  notify.save()
               res.status(201).send({message:"Requested  succesfuly"})
                  
                
               }else{
                logger.log({
                  level: 'error',
                  message:"not  succesfuly",
                  
                  time :  new Date()
              
                });
                logger.add(new winston.transports.Console({
                  format: winston.format.simple()
                }));
             
             
              res.status(400).send({message:"not succesfull "})
                
          }
                       
                
            }catch(err){
                console.log(err)
                logger.log({
                  level: 'info',
                  message:"Server Error",
                  
                  time :  new Date()
              
                });
                logger.add(new winston.transports.Console({
                  format: winston.format.simple()
                }));
                res.status(500).send({message:"Error while creating requested products "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
    };

exports.findRequestedProductByUserId = async (req, res) => {
        try{
         
            let userId = req.params.userId;         
                const findrequestedProduct = await Requestedproducts.find({userId:userId}).sort({"_id": -1})
                .populate('productId')
                console.log(findrequestedProduct)
                res.status(200).send(findrequestedProduct)
               
                              
           }catch(err){
            logger.log({
              level: 'error',
              message:"Server error",
              params: req.params,
                  query: req.query,
                  url: req.url,
                  statusCode: 500,
              time :  new Date()
          
            });
            logger.add(new winston.transports.Console({
              format: winston.format.simple()
            }));
               console.log(err)
               res.status(500).send({message:"Error while getting product "})
           }
};

exports.findRequestedProductById = async (req, res) => {
    try{
      
        let productId = req.params.productId;         
            const findrequestedProduct = await Requestedproducts.findOne({_id:productId}).sort({"_id": -1})
            .populate('productId')
            logger.log({
              level: 'info',
              message:"Successfull",
              params: req.params,
              query: req.query,
              url: req.url,         
              time :  new Date()
          
            });
            logger.add(new winston.transports.Console({
              format: winston.format.simple()
            }));
            res.status(200).send(findrequestedProduct)
            
                          
        }catch(err){
        logger.log({
          level: 'error',
          message:"Server error",
          params: req.params,
              query: req.query,
              url: req.url,
              statusCode: 500,
          time :  new Date()
      
        });
        logger.add(new winston.transports.Console({
          format: winston.format.simple()
        }));
            console.log(err)
            res.status(500).send({message:"Error while getting product "})
        }
};

exports.findAll = async (req, res) => {
    try{
            const findrequestedProduct = await Requestedproducts.find().sort({"_id": -1})
            .populate('productId')
            logger.log({
              level: 'info',
              message:"Successfull",
              params: req.params,
              query: req.query,
              url: req.url,         
              time :  new Date()
          
            });
            logger.add(new winston.transports.Console({
              format: winston.format.simple()
            }));
            res.status(200).send(findrequestedProduct)
            
                          
        }catch(err){
        logger.log({
          level: 'error',
          message:"Server error",
          params: req.params,
              query: req.query,
              url: req.url,
              statusCode: 500,
          time :  new Date()
      
        });
        logger.add(new winston.transports.Console({
          format: winston.format.simple()
        }));
            console.log(err)
            res.status(500).send({message:"Error while getting product "})
        }
};

exports.reply = async(req, res) => {
  const {   reply } = req.body;
  if (reply===""){
        res.status(400).send({
            message:"Incorrect entry format"
        });
  }else{    
    try{
        const _id = req.params.id;
        const updateRequestedProduct = await Requestedproducts.findOneAndUpdate({ _id }, { reply: req.body.reply });
        const findRequestedProduct =  await Requestedproducts.findOne({_id: _id} )
        const notify = new Notifications({
          messageTo: findRequestedProduct.userId,              
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
        const emailTo = findRequestedProduct.email.toLowerCase();
        const link = `${hostUrl}`;
        const link2 = `${hostUrl2}`;
        const firstName = findRequestedProduct.firstName
        processEmail(emailFrom, emailTo, subject, link, link2, text, firstName);
         
        console.log(updateRequestedProduct)
        res.status(200).send({message:"Reply was saved  succesfully"})
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Error while updating requested product "})
    }
  }

};


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