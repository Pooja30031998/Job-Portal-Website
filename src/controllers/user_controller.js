import UserModel from "../models/user_model.js";

export default class UserController {
  postUser(req, res, next) {
    const userInfo = req.body;
    UserModel.addUser(userInfo);
    res.render("login");
  }
  loginUser(req, res, next) {
    const loginInfo = req.body;
    const user = UserModel.userFound(loginInfo);
    const userObj = UserModel.userName(loginInfo);
    if (user) {
      req.session.userEmail = loginInfo.email;
      req.session.userName = userObj.name;
      req.session.recruiterId = userObj.id;
      return res.redirect("/jobs");
    }
    res.render("error", {
      userNotFound: true,
      jobNotFound: null,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
}
