
// for job seekers

const mongoose= require('mongoose');
const plm= require("passport-local-mongoose")
 
const userSchema2 = mongoose.Schema({
username: String,
name: String,
email: String, 
password: String,
ProfileImage: String,
contact: Number,
boards: {
  type: Array,
  default:[]
},
posts: [{
  type : mongoose.Schema.Types.ObjectId,
  ref: "post"
}

]
});
userSchema2.plugin(plm);
module.exports=mongoose.model("user2",userSchema2 )

