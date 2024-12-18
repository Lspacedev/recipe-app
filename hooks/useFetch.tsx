import { useState } from "react";

type RecipeType = {
  _id: string;
  name: string;
  ingredients: string;
  instructions: string;
  category: string;
  prepTime: number;
  cookingTime: number;
  servings: number;
  imageUrl: string;
  createdAt: string;
};

type RecipeResponse = Array<RecipeType> | RecipeType;
const useFetch = () => {
  const [state, setData] = useState<Array<RecipeType>>([]);
  const getFetch = async (link: string, options: RequestInit, id?: string) => {
    try {
      const res = await fetch(link, options);
      const data: RecipeResponse = await res.json();
      if (options.method === "DELETE") {
        setData((state) => {
          if (!state) return [];
          return state.filter((item) => item._id !== id);
        });
      } else if (options.method === "PUT") {
        setData((state) => {
          return state.map((item) => {
            if (item._id !== id) {
              const recipeObj: RecipeType = data as RecipeType;
              return recipeObj;
            }
            return item;
          });
        });
      } else if (options.method === "POST") {
        setData((state) => {
          return [...state, data as RecipeType];
        });
      } else {
        const arrayResponse: Array<RecipeType> = data as Array<RecipeType>;
        setData(arrayResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [state, getFetch] as const;
};

export default useFetch;
