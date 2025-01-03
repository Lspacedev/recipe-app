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
type ResponseDataType = {
  limit: number;
  page: number;
  recipes: Array<RecipeType>;
  totalRecipes: number;
};

type RecipeResponse = Array<RecipeType> | RecipeType | any;
const useFetch = () => {
  const [state, setData] = useState<Array<RecipeType>>([]);
  const [loading, setLoading] = useState(false);

  const getFetch = async (link: string, options: RequestInit, id?: string) => {
    try {
      setLoading(true);
      const res = await fetch(link, options);

      const data: RecipeResponse | ResponseDataType = await res.json();

      if (options.method === "DELETE") {
        setData((state) => {
          if (!state) return [];
          return state.filter((item) => item._id !== id);
        });
        setLoading(false);
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
        setLoading(false);
      } else if (options.method === "POST") {
        setData((state) => {
          return [...state, data as RecipeType];
        });
        setLoading(false);
      } else {
        const arrayResponse: Array<RecipeType> =
          data.recipes as Array<RecipeType>;

        setData(arrayResponse);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return [loading, state, getFetch] as const;
};

export default useFetch;
