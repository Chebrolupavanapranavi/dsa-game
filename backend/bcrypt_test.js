import bcrypt from "bcryptjs";

const storedHashedPassword = "$2b$10$Gqgm/EBxio61NjSKLpRE6uhdiYYxEZ8IpcfTRrYW7tVYAfw6Zuu"; // Copy from MongoDB
const enteredPassword = "123456"; // The password you used for signup

const checkPassword = async () => {
  const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
  console.log("Password Match:", isMatch);
};

checkPassword();
