const { verify } = require("crypto");
const { validationResult } = require("express-validator");
// const { verifyToken } = require("../services/auth.service");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ err: errors });
  };
};

// const authGuard = async (req, res, next) => {
//   const authToken = req.headers['authorization'];

//   if (!authToken) {
//     return res.status(400).send({
//       err: 'Forbidden Resource1'
//     });
//   }

//   try {
//     const payload = await verifyToken(authToken.split('Bearer ')[1]);
//     req.user = payload;
//     next();
//   } catch (err) {
//     return res.status(400).send({
//       err: 'Forbidden Resource'
//     });
//   }
// };

module.exports = { validate };
