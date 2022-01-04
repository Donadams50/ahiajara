module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        category: String,
        symptom:Array,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Symptom = mongoose.model("symptom", schema);
    return Symptom;
  };
  
 