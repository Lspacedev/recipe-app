const parseJwt = (token) => {
  const decode = JSON.parse(atob(token.split(".")[1]));
  console.log(decode);
  if (decode.exp * 1000 < new Date().getTime()) {
    localStorage.clear("token");
    console.log("Time Expired");
  }
};

export default parseJwt;
