import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { useRouter } from "next/router";
import { UserContext } from "context/userContext";
import { FavouritesContext } from "context/favouritesContext";
import {
  Box,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Button,
  useToast,
  useDisclosure
} from "@chakra-ui/react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import {
  addFavMeal,
  removeFavMeal,
  addFavIngredient,
  removeFavIngredient
} from "utils/favourites";

const FavouriteButton = ({ item, isMeal, isIngredient, ...props }) => {
  const router = useRouter();
  const cancelRef = useRef();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favMeals, setFavMeals, favIngredients, setFavIngredients } =
    useContext(FavouritesContext);
  const { userData } = useContext(UserContext);
  const [favourite, setFavourite] = useState({
    isFavourite: false,
    id: "0"
  });

  const handleSetFavourite = () => {
    if (!favourite.isFavourite) {
      if (isMeal) {
        const { strMeal, strMealThumb, idMeal } = item;
        const value = {
          strMeal,
          strMealThumb,
          idMeal
        };
        addFavMeal(value, favMeals, setFavMeals, toast, setFavourite);
      }

      if (isIngredient) {
        const { strIngredient, idIngredient, strDescription } = item;
        const value = {
          strIngredient,
          idIngredient,
          strDescription
        };
        addFavIngredient(
          value,
          favIngredients,
          setFavIngredients,
          toast,
          setFavourite
        );
      }
    } else {
      if (isMeal) {
        removeFavMeal(favourite.id, favMeals, setFavMeals, toast, setFavourite);
      }

      if (isIngredient) {
        removeFavIngredient(
          favourite.id,
          favIngredients,
          setFavIngredients,
          toast,
          setFavourite
        );
      }
    }
  };

  const handleFavouriteClick = () => {
    if (!userData?.isLoggedIn) {
      onOpen();
    } else {
      handleSetFavourite();
    }
  };

  const filterMeals = useCallback(() => {
    return favMeals.filter((fav) => {
      if (fav.idMeal === item.idMeal) {
        return setFavourite({
          isFavourite: true,
          id: fav._id
        });
      }
    });
  }, [favMeals]);

  const filterIngredients = useCallback(() => {
    return favIngredients.filter((fav) => {
      if (fav.idIngredient === item.idIngredient) {
        return setFavourite({
          isFavourite: true,
          id: fav._id
        });
      }
    });
  }, [favIngredients]);

  useEffect(() => {
    if (!userData?.isLoggedIn) {
      return setFavourite({
        isFavourite: false,
        id: "0"
      });
    }

    if (isMeal) {
      filterMeals();
    }

    if (isIngredient) {
      filterIngredients();
    }
  }, [userData?.isLoggedIn, isMeal, filterMeals, filterIngredients]);

  return (
    <Box {...props}>
      <Box onClick={handleFavouriteClick}>
        <Text cursor="pointer">
          {favourite.isFavourite ? (
            <HiHeart style={{ color: "#d33" }} />
          ) : (
            <HiOutlineHeart />
          )}
        </Text>
      </Box>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent mx={4}>
          <AlertDialogHeader>Authentication Needed</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You must login to your account to add or remove favourites.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              bgColor="secondary.main"
              _hover={{ background: "secondary.light" }}
              _active={{ background: "secondary.dark" }}
              color="black"
              ref={cancelRef}
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => router.push("/auth")}
              bgColor="primary.main"
              _hover={{ background: "primary.light" }}
              _active={{ background: "primary.dark" }}
              color="black"
              ml={3}>
              Login Now
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default FavouriteButton;
