module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        
        messageTo: String,
        read: Boolean,
        messageFrom:String,
        message: String,
        messageFromFirstname:String,
        messageFromLastname:String
        
     
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Notification = mongoose.model("notification", schema);
    return Notification;
  };
  
 