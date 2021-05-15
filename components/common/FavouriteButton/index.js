// import React, { useContext, useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { UserContext } from "context/userContext";
// import { FavouritesContext } from "context/favouritesContext";
// import {
//   Box,
//   Text,
//   AlertDialog,
//   AlertDialogOverlay,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogCloseButton,
//   Button,
//   useToast,
//   useDisclosure
// } from "@chakra-ui/react";
// import { HiOutlineHeart, HiHeart } from "react-icons/hi";

// const FavouriteButton = ({ dataBody, isMeal, isIngredient, ...props }) => {
//   const cancelRef = useRef();
//   const toast = useToast();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const router = useRouter();

//   const { userData } = useContext(UserContext);
//   const { favMeals, setFavMeals, favIngredients, setFavIngredients } =
//     useContext(FavouritesContext);

//   const fixedDataBody = dataBody !== undefined && dataBody;

//   const userId = userData !== undefined && userData.id;
//   const isLoggedIn = userData !== undefined && userData.isLoggedIn;

//   const apiUrl = {
//     meals: {
//       add: `${process.env.NEXT_PUBLIC_API_USER_URL}/favourites-meal/add`,
//       delete: `${process.env.NEXT_PUBLIC_API_USER_URL}/favourites-meal/delete`
//     },
//     ingredients: {
//       add: `${process.env.NEXT_PUBLIC_API_USER_URL}/favourites-ingredient/add`,
//       delete: `${process.env.NEXT_PUBLIC_API_USER_URL}/favourites-ingredient/delete`
//     }
//   };

//   const [isFavourite, setIsFavourite] = useState({
//     favourite: false,
//     favId: ""
//   });

//   const handleSetFavourite = () => {
//     if (!isFavourite.favourite) {
//       const addUrl = isMeal
//         ? apiUrl.meals.add
//         : isIngredient
//         ? apiUrl.ingredients.add
//         : null;

//       console.log(fixedDataBody);

//       axios
//         .post(addUrl, {
//           ...fixedDataBody,
//           userId
//         })
//         .then((res) => {
//           if (isMeal) {
//             const { userId, _id } = res.data.meal;

//             setFavMeals([
//               ...favMeals,
//               {
//                 ...fixedDataBody,
//                 userId,
//                 _id
//               }
//             ]);

//             setIsFavourite({
//               favourite: true,
//               favId: _id
//             });
//           } else if (isIngredient) {
//             const { userId, _id } = res.data.ingredient;

//             setFavIngredients([
//               ...favIngredients,
//               {
//                 ...fixedDataBody,
//                 userId,
//                 _id
//               }
//             ]);

//             setIsFavourite({
//               favourite: true,
//               favId: _id
//             });
//           }

//           toast({
//             position: "bottom-right",
//             status: "success",
//             variant: "solid",
//             title: "Added to favourites",
//             isClosable: true
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       handleRemoveFavourite(isFavourite.favId);
//     }
//   };

//   const handleRemoveFavourite = (id) => {
//     const deleteUrl = isMeal
//       ? `${apiUrl.meals.delete}/${id}`
//       : isIngredient
//       ? `${apiUrl.ingredients.delete}/${id}`
//       : null;

//     axios
//       .delete(deleteUrl)
//       .then(() => {
//         if (isMeal) {
//           favMeals.splice(
//             favMeals.findIndex((fav) => fav._id === id),
//             1
//           );

//           setFavMeals([...favMeals]);
//         } else if (isIngredient) {
//           favIngredients.splice(
//             favIngredients.findIndex((fav) => fav._id === id),
//             1
//           );

//           setFavIngredients([...favIngredients]);
//         }

//         setIsFavourite({
//           favourite: false,
//           favId: ""
//         });

//         toast({
//           position: "bottom-right",
//           status: "error",
//           variant: "solid",
//           title: "Removed from favourites",
//           isClosable: true
//         });
//       })
//       .catch((err) => {
//         alert(err.response.data.message);
//       });
//   };

//   const handleFavouriteClick = () => {
//     if (isLoggedIn) {
//       handleSetFavourite();
//     } else {
//       onOpen();
//     }
//   };

//   useEffect(() => {
//     if (!isLoggedIn) {
//       setIsFavourite({
//         favourite: false,
//         favId: ""
//       });
//     }

//     if (isMeal) {
//       favMeals.filter((fav) => {
//         if (fav.idMeal === fixedDataBody.idMeal) {
//           return setIsFavourite({
//             favourite: true,
//             favId: fav._id
//           });
//         }
//       });
//     } else if (isIngredient) {
//       favIngredients.filter((fav) => {
//         if (fav.idIngredient === fixedDataBody.idIngredient) {
//           return setIsFavourite({
//             favourite: true,
//             favId: fav._id
//           });
//         }
//       });
//     }
//   }, [isLoggedIn, isMeal, isIngredient, favMeals, favIngredients]);

//   return (
//     <Box {...props}>
//       <Box onClick={handleFavouriteClick}>
//         <Text cursor="pointer">
//           {isFavourite.favourite ? (
//             <HiHeart style={{ color: "#d33" }} />
//           ) : (
//             <HiOutlineHeart />
//           )}
//         </Text>
//       </Box>

//       <AlertDialog
//         motionPreset="slideInBottom"
//         leastDestructiveRef={cancelRef}
//         onClose={onClose}
//         isOpen={isOpen}
//         isCentered>
//         <AlertDialogOverlay />

//         <AlertDialogContent mx={4}>
//           <AlertDialogHeader>Authentication Needed</AlertDialogHeader>
//           <AlertDialogCloseButton />
//           <AlertDialogBody>
//             You must login to your account to add or remove favourites.
//           </AlertDialogBody>
//           <AlertDialogFooter>
//             <Button
//               bgColor="secondary.main"
//               _hover={{ background: "secondary.light" }}
//               _active={{ background: "secondary.dark" }}
//               color="black"
//               ref={cancelRef}
//               onClick={onClose}>
//               Cancel
//             </Button>
//             <Button
//               onClick={() => router.push("/auth")}
//               bgColor="primary.main"
//               _hover={{ background: "primary.light" }}
//               _active={{ background: "primary.dark" }}
//               color="black"
//               ml={3}>
//               Login Now
//             </Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </Box>
//   );
// };

// export default FavouriteButton;

import React from "react";

const FavouriteButton = () => {
  return (
    <div>
      <p>Button</p>
    </div>
  );
};

export default FavouriteButton;
