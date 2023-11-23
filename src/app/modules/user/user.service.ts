import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
const getAllUsersFromBD = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromBD = async (id: string) => {
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
};
