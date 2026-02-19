import User from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// register logic----------------
const Register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fileds are required"
    })
  }
  const userExist = await User.findOne({ email })

  if (userExist) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  console.log("Incoming data:", req.body); // log input


  const data = await User.create({ username, email, password });

  return res.status(200).json(
    {
      user: {
        _id: data._id,
        username: data.username,
        email: data.email
      },
      msg: "Register Successfully"
    });
}

// login logic------------------
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "All fields are required"
    });
  }

  const userExist = await User.findOne({ email })

  if (!userExist) {
    return res.status(400).json({ msg: "Invalid Email or Password" });
  }

  const isMatch = await bcrypt.compare(password, userExist.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Email or Password" });
  }

  // ----------------------------Incase of only access token
  // const token = jwt.sign({userId: userExist._id}, process.env.SECRET_KEY, {expiresIn: "1d"});

  // return res.status(200).cookie("token", token, {
  //   maxAge: 1*24*60*60*1000,
  //   httpOnly: true,     
  //   sameSite: "strict"
  // }).json({success: true, msg: "Login Successfully", user_Id: userExist._id.toString()});

  // -----------------------------In case of refresh and access tokens
  // Access Token (short expiry)
  const accessToken = jwt.sign(
    { userId: userExist._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Refresh Token (long expiry)
  const refreshToken = jwt.sign(
    { userId: userExist._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Send tokens in cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return res.status(200).json({
    success: true,
    msg: "Login Successfully",
    user_Id: userExist._id.toString()
  });
}


// Logout Logic 
const Logout = async (req, res) => {

  // ---------------------------------- In case of only access token clearing the token

  //   return res.status(200).cookie("token", "", {       
  //       maxAge: 0,
  //       httpOnly: true,     
  //       sameSite: "strict"
  //     }).json({ success: true, msg: "Logout Successfully" });

  // ----------------------------------- In case of access and refresh token 
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  return res.status(200).json({ success: true, msg: "Logout Successfully" });

}


export { Register, Login, Logout };