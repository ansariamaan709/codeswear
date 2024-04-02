class AuthenticationService {
  registerSuccessfulLoginBusiness(username) {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", "admin");
    localStorage.setItem("role", "admin");
    console.log("Successful login");
  }

  registerSuccessfulLoginUser(username) {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", "user");
    localStorage.setItem("role", "user");
    console.log("Successful login");
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  isUserLoggedIn() {
    let role = sessionStorage.getItem("role");
    if (role !== "user") {
      return false;
    } else {
      return true;
    }
  }

  isBusinessLoggedIn() {
    let role = sessionStorage.getItem("role");
    if (role !== "business") {
      return false;
    } else {
      return true;
    }
  }

  getLoggedInUser() {
    let username = sessionStorage.getItem("authenticatedUser");
    if (username == null) {
      return "";
    } else {
      return username;
    }
  }

  setUpToken(jwtToken) {
    localStorage.setItem("token", jwtToken);
  }
}

export default new AuthenticationService();
