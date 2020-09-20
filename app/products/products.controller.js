const db = require("../mongoose");
const Products = db.products;
 const sendemail = require('../helpers/emailhelper.js');

// Add new product to database
exports.create = async(req, res) => {
  console.log(req.body)
  // let {myrefCode} = req.query;
  const {   name, quantityAvailable  , price , category, description} = req.body;
  
  if ( price && quantityAvailable && name && category ){
      if ( name==="" || price==="" || quantityAvailable==="" || category==="" ){
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
              price: req.body.price,
              category: req.body.category,
              description: req.body.description
        
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
        console.log(req.query)
      
        const resultsPerPage =  parseInt(req.query.limit);
        const offset1 = parseInt(req.query.offset);
        console.log(resultsPerPage)
        console.log(offset1)
        if(offset1 === 1){
            const findAllProduct = await Products.find().sort({ _id: "desc" })
            .limit(resultsPerPage)
            console.log(findAllProduct)
            res.status(200).send(findAllProduct)
        }else{
            const page = offset1 -1;
        const findAllProduct = await Products.find().sort({ _id: "desc" })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        console.log(findAllProduct)
        res.status(200).send(findAllProduct)
    }        
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting product "})
       }
};

// Update a product
exports.update = async(req, res) => {
    const _id = req.params.id;
    console.log(req.body)
     
 if(req.file ){
     console.log("first")
    const products = new Products({
        _id : req.params.id,
        name: req.body.name,
       imgUrl: req.file.url,
        quantityAvailable: req.body.quantityAvailable,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description
      });
       try{


                        const updateProduct = await Products.updateOne( {_id}, products)
                           console.log(updateProduct)
                        //   const getProduct = await Products.findOne({_id:_id})
                        if(updateProduct.nModified === 1){
                           res.status(200).send({message:"Product updated "})
                        } else{
                            res.status(400).send({message:"Product not updated "})
                        }
                        }
                    catch(err){
                            console.log(err)
                            res.status(500).send({message:"Error while updating product "})
                        }
      }else{
          console.log("second")
          
           const products = new Products({
        _id : req.params.id,
        name: req.body.name,
       imgUrl: req.body.files,
        quantityAvailable: req.body.quantityAvailable,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description
      });
      console.log(products)
       try{


                        const updateProduct = await Products.updateOne( {_id}, products)
                           console.log(updateProduct)
                        //   const getProduct = await Products.findOne({_id:_id})
                        if(updateProduct.nModified === 1){
                           res.status(200).send({message:"Product updated "})
                        } else{
                            res.status(400).send({message:"Product not updated "})
                        }
                        }
                    catch(err){
                            console.log(err)
                            res.status(500).send({message:"Error while updating product "})
                        }
      }
    //  

                   
};

  // Count all products 
exports.count = async (req, res) => {
    try{

        const countProduct = await Products.countDocuments()
        console.log(countProduct)
          res.status(200).send({countOfAllProduct:countProduct})
     }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while counting product "})
       }
};

//get product by category
exports.getByCategory = async (req, res) => {
    try{
        console.log(req.query)
      
        const resultsPerPage =  parseInt(req.query.limit);
        const offset1 = parseInt(req.query.offset);
        let category = req.params.category;
        console.log(resultsPerPage)
        console.log(offset1)
        if(offset1 === 1){
            
            const findAllProduct = await Products.find({category:category}).sort({ _id: "desc" })
            .limit(resultsPerPage)
            console.log(findAllProduct)
            res.status(200).send(findAllProduct)
        }else{
            const page = offset1 -1;
        const findAllProduct = await Products.find({category:category}).sort({ _id: "desc" })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        console.log(findAllProduct)
        res.status(200).send(findAllProduct)
    }        
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting product "})
       }
};