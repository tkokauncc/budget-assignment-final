const router = require("express").Router();
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("./utils/EmailUtil");

const secretToken = "SecretToken12345";

const createSecretToken = (id) => {
  return jwt.sign({ id }, secretToken, {
    expiresIn: 60,
  });
};

router.get("/", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, secretToken, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
});

router.get("/refresh-token", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, secretToken, async (err, data) => {
    if (err) {
      console.log("entered error");
      return res.json({ status: false });
    } else {
      console.log("entered success");
      const user = await User.findById(data.id);
      const token = createSecretToken(user._id);
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token: token,
      });
    }
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const hostName = req.get("host");
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username });
    const token = jwt.sign({ id: user._id }, secretToken);
    sendEmail(
      email,
      "Email Verification",
      `<div>Please click on the below link to verify your email address <br/><a style="color:blue" href="http://${hostName}/verify/${user._id}/${token}">Verification Link</a></div>`
    );
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
      // token: token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
});

router.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (!user) return res.status(400).send("Invalid link");

    jwt.verify(req.params.token, secretToken, async (err, data) => {
      console.log(err, data);
      if (err) {
        return res.json({ status: false });
      } else {
        const user = await User.findById(data.id);
        if (user) {
          await User.updateOne({ _id: user._id }, { emailVerified: true });
          res.send("Email verified successfully");
        } else return res.json({ status: false });
      }
    });
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token: token,
      emailVerified: user.emailVerified,
    });
    next();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
