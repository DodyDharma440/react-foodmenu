import * as api from "api";

export const addFavMeal = async (
  value,
  favMeals,
  setFavMeals,
  toast,
  setFavourite
) => {
  try {
    const { data } = await api.addFavMeal(value);
    setFavMeals([...favMeals, data.newData]);
    setFavourite({
      isFavourite: true,
      id: data.newData._id
    });
    toast({
      position: "bottom-right",
      status: "success",
      variant: "solid",
      title: "Added to favourites",
      isClosable: true
    });
  } catch (error) {
    toast({
      position: "bottom-right",
      status: "error",
      variant: "solid",
      title: error.response.data.message,
      isClosable: true
    });
  }
};

export const removeFavMeal = async (
  id,
  favMeals,
  setFavMeals,
  toast,
  setFavourite
) => {
  try {
    await api.removeFavMeal(id);
    favMeals.splice(
      favMeals.findIndex((fav) => fav._id === id),
      1
    );
    setFavMeals([...favMeals]);
    setFavourite({
      isFavourite: false,
      id: "0"
    });
    toast({
      position: "bottom-right",
      status: "warning",
      variant: "solid",
      title: "Removed from favourites",
      isClosable: true
    });
  } catch (error) {
    toast({
      position: "bottom-right",
      status: "error",
      variant: "solid",
      title: error.response.data.message,
      isClosable: true
    });
  }
};
