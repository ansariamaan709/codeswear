import axios from "../customAxiosConfig/CustomAxiosConfig";

const LoginService = async (username) => {
  try {
    return await axios.post(`/login`, null, {
      params: {
        username,
      },
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default LoginService;
