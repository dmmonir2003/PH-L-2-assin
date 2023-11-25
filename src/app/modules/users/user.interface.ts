interface FullName {
  firstName: string;
  lastName: string;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

export type TUser = {
  userId: number;
  userName: string;
  password: string | undefined;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
};
