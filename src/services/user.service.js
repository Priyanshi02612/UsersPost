export const getAllUsers = async () => {
  const responseOfUsers = await fetch("https://dummyjson.com/users");
  const usersData = await responseOfUsers.json();
  return usersData.users;
};
