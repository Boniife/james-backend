const RegisterModel = require("../models/Register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await RegisterModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "wrong password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ decoded: existingUser, token, message: "signin sucessfull" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // if (password !== passwordConfirm)
    //   return res.status(400).json({ message: "Password doesn't match." });
    const existingUser = await RegisterModel.findOne({ email: email });

    if (existingUser) {
      res.status(409).json({ message: "Already have an account" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const decoded = await RegisterModel.create({
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { email: decoded.email, id: decoded._id },
        "test",
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ decoded, token, message: "signup successful" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { signIn, signUp };
