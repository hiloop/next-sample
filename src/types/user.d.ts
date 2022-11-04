export type UserInfo = {
  commonRes: CommonRes;
  ipAddress: string;
  user: User;
};

export type CommonRes = {
  status: string;
};

export type User = {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
};
