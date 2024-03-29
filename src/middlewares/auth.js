import { UserDao } from "../Dao/index.js";
import { JWT_UTILS } from "../utils/jwt-utils.js";

const isValidAuthToken = async (req, res, next) => {
  try {
    const { tokenCookie } = req.cookies;
    console.log(tokenCookie);

    if (!tokenCookie) {
      console.log('error aca')
      throw new Error("Unauthorized");
    }

    const verifiedToken = JWT_UTILS.verifyToken(tokenCookie, "secret");

    if (!verifiedToken) {
      throw new Error("Unauthorized");
    }

    const user = await UserDao.getById(verifiedToken.id);

    if (!user) {
      throw new Error("Unauthorized");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
  }
};

export { isValidAuthToken };
