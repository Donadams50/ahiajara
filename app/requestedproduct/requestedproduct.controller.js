const db = require("../mongoose");
const Requestedproducts = db.requestedproducts;
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
    const {   productId, userId, quantitySelected, firstName , lastName , email , address , country , city  } = req.body;
    
    if ( productId && userId && quantitySelected && firstName && lastName && email &&  address && country && city){
        if ( productId==="" || userId==="" || quantitySelected==="" || firstName === "" || lastName === "" || email === " " ||  address === "" || country  === "" || city === ""){
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
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                address:req.body.address,
                country:req.body.country,
                city: req.body.city
                
          
              });
    
         
            try{
      
              const  requestedProduct = await  requestedproduct.save()
              console.log(requestedProduct)
           
               if(requestedProduct._id){
                logger.log({
                    level: 'info',
                    message:"added  succesfuly",
                    
                    time :  new Date()
                
                  });
                  logger.add(new winston.transports.Console({
                    format: winston.format.simple()
                  }));
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
                const findrequestedProduct = await Requestedproducts.find({userId:userId})
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
                const findrequestedProduct = await Requestedproducts.findOne({_id:productId})
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
             
                const findrequestedProduct = await Requestedproducts.find()
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