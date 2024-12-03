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
  const getFetch = async (link: string, options: RequestInit, id?: string) => {
    try {
      const res = await fetch(link, options);
      const data: UserResponse = await res.json();

      return { status: res.ok, data };
    } catch (error) {
      console.log(error);
    }
  };
  return { getFetch };
};

export default userFetch;
