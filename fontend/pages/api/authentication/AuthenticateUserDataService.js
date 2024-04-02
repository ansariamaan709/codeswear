import axios from "axios";

const AuthenticateUserDataService = (userName, password) => {
  return axios
    .post(`http://localhost:8080/authenticate`, {
      userName,
      password,
    })
    .then((res) => {
      if (res != null) {
        console.log(res);
        return res;
      }
    })
    .catch((err) => {
      let error = "";

      if (err.response) {
        error += err.response;
      }
      return error;
    });
};

export default AuthenticateUserDataService;
