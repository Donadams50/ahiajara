module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        imgUrl:String,
        quantity:Number,
        price:String,
        status: String,
        userId: String,
        firstName: String,
        lastName: String,
        productId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Order = mongoose.model("order", schema);
    return Order;
  };
  
