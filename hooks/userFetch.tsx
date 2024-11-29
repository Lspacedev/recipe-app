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
      console.log({ res, data });
      return { status: res.ok, data };
      //   if (options.method === "DELETE") {
      //     setData((state) => {
      //       if (!state) return [];
      //       return state.filter((item) => item._id !== id);
      //     });
      //   } else if (options.method === "PUT") {
      //     setData((state) => {
      //       return state.map((item) => {
      //         if (item._id !== id) {
      //           const UserObj: UserType = data as UserType;
      //           return UserObj;
      //         }
      //         return item;
      //       });
      //     });
      //   } else if (options.method === "POST") {
      //     setData((state) => {
      //       return [...state, data as UserType];
      //     });
      //   } else {
      //     const arrayResponse: Array<UserType> = data as Array<UserType>;
      //     setData(arrayResponse);
      //   }
    } catch (error) {
      console.log(error);
    }
  };
  return { getFetch };
};

export default userFetch;
