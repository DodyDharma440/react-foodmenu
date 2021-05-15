import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//Meal
export const getMealsByCategory = (category) => {
  const url = `${API_BASE_URL}/filter.php?c=${category}`;

  return axios.get(url);
};

export const getMealsByIngredient = (ingredient) => {
  const url = `${API_BASE_URL}/filter.php?i=${ingredient}`;

  return axios.get(url);
};

export const getDetailMeal = (id) => {
  const url = `${API_BASE_URL}/lookup.php?i=${id}`;

  return axios.get(url);
};

export const searchMeals = (searchValue) => {
  const url = `${API_BASE_URL}/search.php?s=${searchValue}`;

  return axios.get(url);
};

//Ingredient
export const getIngredientList = () => {
  const url = `${API_BASE_URL}/list.php?i=list`;

  return axios.get(url);
};

//Category
export const getCategoryList = () => {
  const url = `${API_BASE_URL}/categories.php`;

  return axios.get(url);
};
