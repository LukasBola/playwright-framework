export type LoginUser = {
  email: string;
  password: string;
};

export const testUser1: LoginUser = {
  email: process.env.USER_NAME ?? 'NOT SET',
  password: process.env.USER_PASSWORD ?? 'NOT SET',
};
