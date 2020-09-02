module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      username: String,
      phoneNo:String,
      email:String,
      code:String,
      forgotPasswordCode:String,
      isVerified: Boolean,
      password: String,
      isAdmin: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Profile = mongoose.model("profile", schema);
  return Profile;
};

// module.exports = mongoose => {
//     const Profile = mongoose.model(
//       "profile",
//       mongoose.Schema(
//         {
//          firstName: String,
//         lastName: String,
//         email:String,
//         phoneNo:String,
//         code:String,
//         forgotPasswordCode:String,
//         isVerified: Boolean
//         },
//         { timestamps: true }
//       )
//     );
  
//     return Profile;
//   };