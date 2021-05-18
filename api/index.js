import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_MEAL = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1"
});

const API_USER = axios.create({
  baseURL: "https://api-foodmenu.herokuapp.com/user"
});

API_USER.interceptors.request.use((req) => {
  const userData = JSON.parse(localStorage.getItem("user-data"));

  if (userData.result) {
    req.headers.Authorization = `Bearer ${userData.token}`;
  }

  return req;
});

//Meal
export const getMealsByCategory = (category) => {
  return API_MEAL.get(`/filter.php?c=${category}`);
};

export const getMealsByIngredient = (ingredient) => {
  return API_MEAL.get(`/filter.php?i=${ingredient}`);
};

export const getDetailMeal = (id) => {
  return API_MEAL.get(`/lookup.php?i=${id}`);
};

export const searchMeals = (searchValue) => {
  return API_MEAL.get(`/search.php?s=${searchValue}`);
};

//Ingredient
export const getIngredientList = () => {
  return API_MEAL.get("/list.php?i=list");
};

//Category
export const getCategoryList = () => {
  return API_MEAL.get("/categories.php");
};

//Auth
export const signIn = (inputValue) => {
  return API_USER.post("/sign-in", inputValue);
};

export const signUp = (inputValue) => {
  return API_USER.post("/sign-up", inputValue);
};

export const deleteAccount = (id) => {
  return API_USER.delete(`/${id}`);
};
