export const getAllUsers = async () => {
  const responseOfUsers = await fetch("https://dummyjson.com/users");
  const usersData = await responseOfUsers.json();
  return usersData.users;
};

//Search user
// export const handleSearchUser = async (searchValue) => {
//   const responseSearchedUsers = await fetch(
//     `https://dummyjson.com/users/search?q=${searchValue}`
//   );
//    return responseSearchedUsers;

// };

export const getUsersToDoById = async (userId) => {
  const responseUsersTodo = await fetch(
    `https://dummyjson.com/users/${userId}/todos`
  );
  const usersToDo = await responseUsersTodo.json();
  return usersToDo.todos;
};

//Get users carts by user id
export const getUsersAllCartsByUserId = async (userId) => {
  const responseOfUsersCarts = await fetch(
    `https://dummyjson.com/users/${userId}/carts`
  );
  const userCartsList = await responseOfUsersCarts.json();
  // console.log(userCartsList);
  return userCartsList.carts;
};
