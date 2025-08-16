const { response } = require("express");
const User = require("../models/model-user");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }

    user = new User( req.body );

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
  
    await user.save()

    // Generate JWT
    const token = await generarJWT(user.id, user.name);

  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
  
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      ok: false,
      msg: "Error creating user",
      error: error.message,
    }); 
    
  }

}

const loginUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }

    // Validate password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    // Generate JWT
    const token = await generarJWT(user.id, user.name);

    
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });

    
  } catch (error) {
    console.error("Error loging user:", error);
    res.status(500).json({
      ok: false,
      msg: "Error loging user",
      error: error.message,
    });
    
  }
}

const revalueToken = async (req, res = response) => {

  const { uid, name} = req;

  // Generate new JWT and return it
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
}


module.exports = {
  createUser,
  loginUser,
  revalueToken,
}