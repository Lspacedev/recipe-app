import { useState } from "react";

const useGet = () => {
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(true);
  const getFetch = async (link: string, options: RequestInit, id?: string) => {
    try {
      const res = await fetch(link, options);
      const data = await res.json();
      console.log("fetchiedm msnfsnfos", data);
      setObj(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return [loading, obj, getFetch];
};

export default useGet;
