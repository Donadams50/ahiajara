const db = require("../mongoose");
const Products = db.products;


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
        
          const products = new Products({
              name: req.body.name,
              imgUrl: req.file.url,
              quantityAvailable: req.body.quantityAvailable,
              price: req.body.price
        
            });
  
       
          try{
           const isProductExist = await Products.findOne({name: name} )
           console.log(isProductExist)
             if(isProductExist){
             
                res.status(400).send({message:"Product already  exists"})
              
             }else{
               
                const saveproduct = await  products.save()
                console.log(saveproduct)
               res.status(201).send({message:"Product created"})
              
        }
                     
              
          }catch(err){
              console.log(err)
              res.status(500).send({message:"Error while creating product "})
          }
      }
  }else{
      res.status(400).send({
          message:"Incorrect entry format"
      });
  }
  };

  // Find all products 
exports.findAllProducts = async (req, res) => {
    try{
        const findAllProduct = await Products.find()
        console.log(findAllProduct)
        res.status(200).send(findAllProduct)
         
                  
           
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while creating product "})
       }
};