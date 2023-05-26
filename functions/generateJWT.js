const jwt = require('jsonwebtoken');

const generateJWT = (userId,userType) => {
    console.log(userId);
    return jwt.sign({ userId:userId,userType }, process.env.JWT_SECRET);
};

module.exports = generateJWT;