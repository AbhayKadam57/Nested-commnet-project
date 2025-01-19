import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();

    res.status(200).json({
      messege: "New user is created...",
    });
  } catch (e) {
    res.status(500).json({ messege: "Error creating user", error: e });
  }
};

export const login = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ messege: "User not found..." });
    }

    const isMatchPassoword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatchPassoword) {
      return res.status(401).json({ messege: "Password is not matched..." });
    }

    const { password, ...userDetails } = user._doc;

    return res
      .status(200)
      .json({ messege: "User login successfull...", userDetails: userDetails });
  } catch (e) {
    return res.status(500).json({ messege: "Error creating user", error: e });
  }
};
