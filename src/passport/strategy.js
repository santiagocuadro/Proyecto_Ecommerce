import { User } from '../models/index.js';
import bCrypt from "bcrypt";


const validatePassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

var createHash = function (password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const login = (req, username, password, cb) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      console.log("Invalid user" + username);
      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      console.log("Invalid user");
      return cb(null, false);
    }
    return cb(null, user);
  });
}

const register = (req, username, password, cb) => {
  User.findOne({ username: username }, function (err, user) {
      if (err) {
          console.log("Error in SignUp: " + err);
          return cb(err);
      }
      if (user) {
          console.log("User already exists");
          return cb(null, false);
      } else {
          const newUser = new User();
          const data = req.body;
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.firstname = data.firstname;
          newUser.age = data.age;
          newUser.direction = data.direction;
          newUser.telephone = data.telephone;
          newUser.avatar = data.avatar;

          newUser.save().then(datos => cb(null,datos)).catch(null,false);
      }
  });
}

export { login, register }