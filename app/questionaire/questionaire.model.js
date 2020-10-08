module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        question: String,
        type:String,
        options:Array
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Questionaire = mongoose.model("questionaire", schema);
    return Questionaire;
  };
  
