module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        imgUrl:String,
        category:String,
        symptom:[{
          type:String
        }],
        description: String
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
  
