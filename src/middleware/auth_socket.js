import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function auth_socket(socket, next) {
  try {
    const { token } = socket.request._query;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("INVALID TOKEN!");
    }
    socket.id = user._id;
    socket.user = user;
    socket.token = token;
    next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

export default auth_socket;
