module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        question: String,
        type:String,
        options:Array,
        imgUrl: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Bespoke = mongoose.model("bespoke", schema);
    return Bespoke;
  };