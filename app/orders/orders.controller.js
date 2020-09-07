const db = require("../mongoose");
const Orders = db.orders;
  const sendemail = require('../helpers/emailhelper.js');

// Add new product to database
exports.create = async(req, res) => {
  console.log(req.body)
  // let {myrefCode} = req.query;
  const {   name, quantityAvailable  , price } = req.body;
  
  if ( price && quantityAvailable && name ){
      if ( name==="" || price==="" || quantityAvailable==="" ){
          res.status(400).send({
              message:"Incorrect entry format"
          });
      }else{
    // console.log(req.file)
    // console.log( JSON.stringify( req.file.url ) ) 
        
          const orders = new Orders({
              name: req.body.name,
              imgUrl: req.file.url,
              quantity: req.body.quantityRequested,
              price: req.body.price,
              status: "Pending",
              userId: req.user.id

        
            });
  
       
          try{
             const emailFrom = 'Ahiajara Skin care    <noreply@Ahiajara.com>';
                const subject = 'New order alert';                      
                const hostUrl = "ahiajara.netlify.app/dashboard"
                 const hostUrl2 = "https://ahiajara.netlify.app/dashboard" 
              const admin = "Admin"
                const   text = "An new order from "+req.user.firstName+" "+req.user.lastName+" has been placed, Login to the dashboard to view" 
               const emailTo = 'tomiczilla@gmail.com'
               const link = `${hostUrl}`;
                 const link2 = `${hostUrl2}`;
                 processEmail(emailFrom, emailTo, subject, link, link2, text, admin);
            
               
                const makeorder = await  orders.save()
                console.log(makeorder)
               res.status(201).send({message:"Order Succesful the admin will attend to it shortly"})
              
       
                     
              
          }catch(err){
              console.log(err)
              res.status(500).send({message:"Error while making order "})
          }
      }
  }else{
      res.status(400).send({
          message:"Incorrect entry format"
      });
  }
  };




  // process email one






exports.findPendingOrder = async (req, res) => {
    try{
        // console.log(req.query)
      
        // const resultsPerPage =  parseInt(req.query.limit);
        // const offset1 = parseInt(req.query.offset);
        // console.log(resultsPerPage)
        // console.log(offset1)
        // if(offset1 === 1){
            // const findAllProduct = await Products.find().sort({ _id: "desc" })
            // .limit(resultsPerPage)
            // console.log(findAllProduct)
            // res.status(200).send(findAllProduct)
        // }else{
            // const page = offset1 -1;
            let status = "Pending"
        const findPendingOrder = await Orders.find({status: status}).sort({ _id: "desc" })
        // .limit(resultsPerPage)
        // .skip(resultsPerPage * page)
        console.log(findPendingOrder)
        res.status(200).send(findPendingOrder)
    // }        
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting orders "})
       }
};


exports.count = async (req, res) => {
    try{
const status = "Pending"
const status1 = "Completed"
allCount ={}
        const countPending = await Orders.countDocuments({status: status})
         const countCompleted = await Orders.countDocuments({status: status1})
        allCount.pendingOrder = countPending;
        allCount.completedOrder = countCompleted;
          res.status(200).send({countOfAllOrder:allCount})
     }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while counting orders "})
       }
};
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