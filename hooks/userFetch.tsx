import { useState } from "react";

type UserType = {
  _id: string;
  username: string;
  email: string;
  passsword: string;
  role: string;
  createdAt: string;
};

type UserResponse = Array<UserType> | UserType | any;
const userFetch = () => {
  const [loading, setLoading] = useState(false);
  const getFetch = async (link: string, options: RequestInit, id?: string) => {
    try {
      setLoading(true);
      const res = await fetch(link, options);

      const data: UserResponse = await res.json();
      setLoading(false);

      return { status: res.ok, data };
    } catch (error) {
      console.log(error);
    }
  };
  return { loading, getFetch };
};

export default userFetch;
