import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const newUser = await User.create(user);
  const { password, ...withOutPassword } = newUser.toJSON();
  return withOutPassword;
};
const getAllUsersFromBD = async () => {
  const users = await User.find();

  const formattedUsers = users.map((user) => ({
    username: user.username,
    fullName: user.fullName,
    age: user.age,
    email: user.email,
    address: user.address,
  }));
  return formattedUsers;
};
const getSingleUserFromBD = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id });
    const { password, ...withOutPassword } = result?.toJSON();
    return withOutPassword;
  } else {
    throw new Error();
  }
};
const updateUserFromDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id });
    return result;
  } else {
    throw new Error();
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromBD,
  getSingleUserFromBD,
  updateUserFromDB,
};
