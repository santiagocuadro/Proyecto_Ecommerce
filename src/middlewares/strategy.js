import { UserDao } from '../Dao/index.js';
import bCrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const validatePassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserDao.getById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          if (!email || !password) return done(null, false);

          const user = await UserDao.getOne({ email: email });

          if (!user || !validatePassword(user, password)) {
            return done(null, false);
          };

          const userResponse = {
            id: user._id,
            email: user.email,
            tel: user.telephone,
            cart: user.cart,
          };

          done(null, userResponse);
        } catch (error) {
          console.log('error en login',error);
          done(error);
        }
      }
    )
  );


};

export const PassportAuth = {
  init,
};
