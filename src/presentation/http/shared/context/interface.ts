export type User = {
  id?: number;
};

// overwrite interface ClsStore of nestjs-cls
declare module 'nestjs-cls' {
  interface ClsStore {
    user: User;
    startAt: bigint;
  }
}
