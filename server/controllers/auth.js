import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Users from "../models/user.js";

//SIGN UP
export const signup = async (req, res) => {
  const infoUser = req.body;
  // console.log(req);
  // console.log(infoUser);

  try {
    const existingUser = await Users.findOne({ email: infoUser.email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(infoUser.password, 12);

    const result = await Users.create({
      email: infoUser.email,
      password: hashedPassword,
      name: `${infoUser.firstName} ${infoUser.lastName}`,
    });

    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "1h",
    // });

    res.status(201).json(
      result
      // token,
    );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//SIGN IN
export const signin = async (req, res) => {
  const infoUser = req.body;
  // console.log(req);

  try {
    const existingUser = await Users.findOne({ email: infoUser.email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      infoUser.password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
