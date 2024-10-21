import bcrypt from "bcryptjs";

const userData = [
  {
    username: "Aditi",
    email: "aditi@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    username: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("789456", 10),
    isAdmin: false,
  },
];

export default userData;
