module.exports = mongoose => {
  var Schema = mongoose.Schema;
    var schema = mongoose.Schema(
      {
        name: String,
        imgUrl:String,
        category:String,
        symptom:Array,
        description: String,
        recommendedProductId:{ type: Schema.Types.ObjectId, ref: 'product' } ,
        recommendedProduct: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Skinissue = mongoose.model("skinissue", schema);
    return Skinissue;
  };
  
