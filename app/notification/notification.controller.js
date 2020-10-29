const db = require("../mongoose");
const Notifications = db.notifications;






exports.Notification = async(req, res) => {
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
                city: req.body.city,
                reply: " "
                
          
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

    exports.getNotification = async (req, res) => {
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

    

    exports.getUnread = async (req, res) => {
        try{
         
            let status = false;         
                const findUnreadNotification = await Notifications.find({read:status})
                console.log(findUnreadNotification)               
                res.status(200).send(findUnreadNotification)
               
                              
           }catch(err){
            
               console.log(err)
               res.status(500).send({message:"Error while getting notification"})
           }
    };

    exports.findAllNotifications = async (req, res) => {
      try{
       
          ;         
              const findAllNotification = await Notifications.find()
              console.log(findAllNotification)               
              res.status(200).send(findAllNotification)
             
                            
         }catch(err){
          
             console.log(err)
             res.status(500).send({message:"Error while getting notifications"})
         }
  };

  
  exports.getNotificationById = async (req, res) => {
    try{
     
        const   id = req.params.id         
        const findSingleNotification = await Notifications.findOne({_id:id})
            console.log(findSingleNotification)               
            res.status(200).send(findSingleNotification)
           
                          
       }catch(err){
        
           console.log(err)
           res.status(500).send({message:"Error while getting notification"})
       }
};

exports.markRead = async (req, res) => {
  try{
   
      const   _id = req.params.id         
  
      const markread = await Notifications.findOneAndUpdate({ _id }, { read: true });
          console.log(markread)        
          res.status(200).send({message:"Mark read was succesfully"})       
          
         
                        
     }catch(err){
      
         console.log(err)
         res.status(500).send({message:"Error while marking as read read"})
     }
};

   