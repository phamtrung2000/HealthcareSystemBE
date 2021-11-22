import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("INVALID TOKEN!");
    }
    req.id = user._id;
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
}

export default auth;
