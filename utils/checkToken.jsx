const parseJwt = (token) => {
  console.log({ token });
  if (token) {
    const decode = JSON.parse(atob(token.split(".")[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
      localStorage.clear("token");
      console.log("Time Expired");
    }
  }
};

export default parseJwt;
