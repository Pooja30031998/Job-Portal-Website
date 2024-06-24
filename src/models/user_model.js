export default class UserModel {
  constructor(id, name, email, password) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.password = password);
  }
  static addUser(userInfo) {
    const newUser = new UserModel(
      users.length + 1,
      userInfo.name,
      userInfo.email,
      userInfo.password
    );
    users.push(newUser);
  }

  static userFound(loginInfo) {
    let status = false;
    const found = users.find(
      (user) =>
        user.email == loginInfo.email && user.password == loginInfo.password
    );
    if (found) {
      status = true;
    }
    return status;
  }

  static userName(loginInfo) {
    const found = users.find(
      (user) =>
        user.email == loginInfo.email && user.password == loginInfo.password
    );
    return found;
  }
}

const users = [];
