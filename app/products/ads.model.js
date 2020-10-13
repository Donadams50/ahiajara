module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
       
        imgUrl:String,
        description:String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Advert = mongoose.model("advert", schema);
    return Advert;
  };
  
