export type UserType = {
    id: number,
    name: string,
    avatar_url: string,
  };
  
export type UsersType = UserType[];

export type AuthedUserType = Omit<UserType, 'avatar_url'>;