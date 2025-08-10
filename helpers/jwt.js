const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
    const payload = { uid, name };
    return new Promise((resolve, reject) => {
      jwt.sign( payload, process.env.SECRET_JWT_SEED,{ 
        expiresIn: '2h' 
    }, (err, token) => {
          if (err) {
            console.error("Error generating JWT:", err);
            reject("Could not generate JWT");
          } else {
            resolve(token);
          }
        }
      );
    });
  }

module.exports = {
  generarJWT
};