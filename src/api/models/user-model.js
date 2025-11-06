const userItems = [
  {
    user_id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
  {
    user_id: 2,
    name: "Jane Smith",
    username: "janes",
    email: "jane@metropolia.fi",
    role: "admin",
    password: "secret",
  },
];

const listAllUsers = () => userItems;

const findUserById = (id) => userItems.find((user) => user.user_id == id);

const addUser = (user) => {
  const newId = userItems[userItems.length - 1].user_id + 1;
  userItems.push({ user_id: newId, ...user });
  return { user_id: newId };
};

export { listAllUsers, findUserById, addUser };
