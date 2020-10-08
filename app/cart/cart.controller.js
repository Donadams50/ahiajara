const db = require("../mongoose");
const Carts = db.carts;



 const sendemail = require('../helpers/emailhelper.js');

 // Add new symptom  to category
 exports.create = async(req, res) => {
    console.log(req.body)
   
    const {   productId, userId, quantitySelected  } = req.body;
    
    if ( productId && userId && quantitySelected ){
        if ( productId==="" || userId==="" || quantitySelected===""){
            res.status(400).send({
                message:"Incorrect entry format"
            });
        }else{
    
          
            const cart = new Carts({
                productId: req.body.productId,
                userId: req.body.userId,
                quantitySelected: req.body.quantitySelected
                
          
              });
    
         
            try{
      
              const  addcart = await  cart.save()
              console.log(addcart)
           
               if(addcart){
               res.status(201).send({message:"added to cart succesfuly"})
                  
                
               }else{
                 
             
              res.status(400).send({message:"not succesfull "})
                
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


    //get cart by userid
exports.findCartByUserId = async (req, res) => {
    try{
        let id = req.params.id;
        
            
            const findcart = await Carts.find({_id:id})
            console.log(findcart)
            res.status(200).send(findcart)
            console.log(findcart)
                          
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting product "})
       }
};

    //get cart by userid
    exports.countCart = async (req, res) => {
        try{
           // let id = req.params.id;
            
                
             
                const countCart = await Carts.countDocuments({userId:categidory1})
                console.log(countCart)
                res.status(200).send(countCart)
               
                              
           }catch(err){
               console.log(err)
               res.status(500).send({message:"Error while getting cart count "})
           }
    };