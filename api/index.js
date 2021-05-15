import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMealsByCategory = (category) => {
  const url = `${API_BASE_URL}/filter.php?c=${category}`;

  return axios.get(url);
};

export const searchMeals = (searchValue) => {
  const url = `${API_BASE_URL}/search.php?s=${searchValue}`;

  return axios.get(url);
};

export const getIngredientList = () => {
  const url = `${API_BASE_URL}/list.php?i=list`;

  return axios.get(url);
};

export const getCategoryList = () => {
  const url = `${API_BASE_URL}/categories.php`;

  return axios.get(url);
};
