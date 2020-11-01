module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username:String,
        firstName: String,
        lastName: String,
        email: String,
        message: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Feedback = mongoose.model("feedback", schema);
    return Feedback;
  };
  
  