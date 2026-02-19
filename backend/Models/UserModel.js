import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  avatarUrl: { type: String, default: "https://www.gravatar.com/avatar/HASH?s=200&d=identicon" },
  isVerified: { type: Boolean, default: false },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  createdAt: { type: Date, default: Date.now },
});


UserSchema.pre("save", async function(next){
  const user = this;    // REFER TO USER BEING SAVING
 
  if(!user.isModified("password")){    
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_Password;
    next();
  } 
  catch (error) {
    next(error);
  }
})

UserSchema.index({ username: 1 });

const User = mongoose.model("User", UserSchema);
export default User;
