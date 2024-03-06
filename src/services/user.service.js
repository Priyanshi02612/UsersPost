export const getAllUsers = async () => {
  const responseOfUsers = await fetch("https://dummyjson.com/users");
  const usersData = await responseOfUsers.json();
  return usersData.users;
};

// //Search user
// export const handleSearchUser = async () => {
//   try {
//     const responseSearchedUsers = await fetch(
//       "https://dummyjson.com/users/search?q=John"
//     );
//   } catch (e) {
//     console.log("error" ,e);
//   }
// };
