module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        entryCode: String,
        username:String,
        firstName:String,
        lastName:String,
        email: String,
        questionAndAnswer:Array,
        reply:String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Entry = mongoose.model("entry", schema);
    return Entry;
  };
  
