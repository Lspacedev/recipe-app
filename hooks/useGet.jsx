import { useState } from "react";

// type RecipeType = {
//   _id: string;
//   name: string;
//   ingredients: string;
//   instructions: string;
//   category: string;
//   prepTime: number;
//   cookingTime: number;
//   servings: number;
//   imageUrl: string;
//   createdAt: string;
// };
// type ResponseDataType = {
//   recipes: Array<RecipeType>;
//   totalRecipes: number;
//   page: number;
//   limit: number;
// };

//type RecipeResponse = RecipeType | ResponseDataType;
const useGet = () => {
  const [obj, setObj] = useState({});
  const getFetch = async (link, options, id) => {
    try {
      const res = await fetch(link, options);
      const data = await res.json();
      //const resObj = data;
      setObj(data);
    } catch (error) {
      console.log(error);
    }
  };
  return [obj, getFetch];
  // const getFetch = async (link: string, options: RequestInit, id?: string) => {
  //   try {
  //     const res = await fetch(link, options);
  //     const data: RecipeResponse = await res.json();
  //     const resObj: RecipeResponse = data as RecipeResponse;
  //     setObj(resObj);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // return [obj, getFetch] as const;
};

export default useGet;
