module.exports = mongoose => {
    var Schema = mongoose.Schema;
      var schema = mongoose.Schema(
        {
          // productId: String,
          productId: { type: Schema.Types.ObjectId, ref: 'product' },
          quantitySelected:Number,
          userId: String,
          firstName:String,
          lastName:String,
          email:String,
          phoneNo:String,
          reply: String
          
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Requestedproduct = mongoose.model("requestedproduct", schema);
      return Requestedproduct;
    };
    
  