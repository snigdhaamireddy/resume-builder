const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    const payload = {
       id: user.id,
       name: user.name,
       email: user.email,
       role: user.role
    };
    const secret = 'gradious-cohort';
    const options = { expiresIn: '1h' };
   
    return jwt.sign(payload, secret, options);
}

module.exports = {
    generateAccessToken
}