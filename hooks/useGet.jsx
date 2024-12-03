import { useState } from "react";

const useGet = () => {
  const [obj, setObj] = useState({});
  const getFetch = async (link, options, id) => {
    try {
      const res = await fetch(link, options);
      const data = await res.json();
      setObj(data);
    } catch (error) {
      console.log(error);
    }
  };
  return [obj, getFetch];
};

export default useGet;
