import { Model } from 'mongoose';

interface FullName {
  firstName: string;
  lastName: string;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string | undefined;
  fullName: FullName;
  age: number;
  email: string;
  hobbies: string[];
  address: Address;
  isActive: boolean;
  orders?: [];
};

export interface userInstanceModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExits(userId: number): Promise<TUser | null>;
}
