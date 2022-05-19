import jwt from "jsonwebtoken";

// Example:
// A logged in user wants to like a post,
// User clicks the like button => auth middleware => *THIS IS CRUCIAL* (next) => like controller

const auth = async (req, res, next) => {
  try {
    // Check if the user is really who they say they are
    const token = req.headers.authorization.split(" ")[1];

    // if the token length is less than 500 it is our own else google
    const isCustomAuth = token.length < 500;

    let decodedData;

    // If this condition is true mean not google login
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      // Getting the user id
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // sub is google's name for specific id
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
