import { Model } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
};
export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUser | null>;
}
