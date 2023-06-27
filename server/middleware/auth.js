import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // console.log(req);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token?.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(decodedData);

      req.userId = decodedData?.id;
      next();
    }
    //  else {
    //   decodedData = jwt.decode(token);
    // console.log(decodedData);

    // req.userId = decodedData?.sub;
    // }
  } catch (error) {
    console.log(error);
  }
};

export default auth;
