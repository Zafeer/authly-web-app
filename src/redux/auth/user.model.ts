export type User = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  id: string;
  name: string;
  email?: string;
  is_verified: boolean;
};
