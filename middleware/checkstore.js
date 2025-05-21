const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const Seller = require("../models/Seller");

exports.checkstore = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    // Verify token expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (Date.now() >= decoded.exp * 1000) {
      return next(new ErrorResponse("Token has expired", 401));
    }

    // Token is valid, proceed with other checks
    console.log("Decoded token:", decoded);

    const seller = await Seller.findById(decoded.id);
    console.log("Found seller:", seller);

    if (!seller) {
      return next(new ErrorResponse("Seller not found", 401));
    }

    req.seller = seller;
    next();
  } catch (err) {
    console.error("Error in checkstore middleware:", err);
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};
