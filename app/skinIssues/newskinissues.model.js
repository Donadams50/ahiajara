module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        body: Object,
      
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Newskinissue = mongoose.model("newskinissue", schema);
    return Newskinissue;
  };
  
