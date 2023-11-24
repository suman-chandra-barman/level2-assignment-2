import { TUser, TUserOrders } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const newUser = await User.create(user);
  const { password, ...withOutPassword } = newUser.toJSON();
  return withOutPassword;
};
const getAllUsersFromDB = async () => {
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
const getSingleUserFromDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id });
    const { password, ...withOutPassword } = result?.toJSON();
    return withOutPassword;
  } else {
    throw new Error();
  }
};
const updateUserFromDB = async (id: string, updatedUserData: TUser) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOneAndUpdate(
      { userId: id },
      updatedUserData,
      { new: true },
    );
    const { password, ...withOutPassword } = result?.toJSON();
    return withOutPassword;
  } else {
    throw new Error();
  }
};
const deleteUserFromDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.deleteOne({ userId: id });
    return result;
  } else {
    throw new Error();
  }
};

const updateOrCreateOrdersIntoDB = async (
  id: string,
  orderData: TUserOrders,
) => {
  if (await User.isUserExists(id)) {
    const user = await User.findOne({ userId: id });
    const { productName, price, quantity } = orderData;
    const newOrder: TUserOrders = {
      productName,
      price,
      quantity,
    };

    if (!user?.orders) {
      user.orders = [];
    }
    user.orders.push(newOrder);
    await user.save();
  } else {
    throw new Error();
  }
};

const getOrdersFromUserDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const user = await User.findOne({ userId: id });
    const orders = user?.orders;
    return orders;
  } else {
    throw new Error();
  }
};
const getTotalPriceOfOrderFromDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const user = await User.findOne({ userId: id });
    const orders = user?.orders;
    if (orders?.length) {
      let total: number = 0;
      orders.map((order) => {
        total += order.price * order.quantity;
      });
      return total;
    }
    throw new Error('The user has no order!');
  } else {
    throw new Error();
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  updateOrCreateOrdersIntoDB,
  getOrdersFromUserDB,
  getTotalPriceOfOrderFromDB,
};
