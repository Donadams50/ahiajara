module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        imgUrl:String,
        quantityAvailable:Number,
        price:String,
        category: String,
        description: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Product = mongoose.model("product", schema);
    return Product;
  };
  
