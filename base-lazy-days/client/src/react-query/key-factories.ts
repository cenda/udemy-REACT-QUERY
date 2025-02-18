import { queryKeys } from "./constants";

export const generateUserKey = (
  userId: number,
  userToken: string
): (string | number)[] => {
  // deliberately exclude userToken from dependency array to keep key consistent regardless of token changes
  // return [queryKeys.user, userId, userToken];
  return [queryKeys.user, userId];
};

export const generateUserAppointmentsKey = (
  userId: number,
  userToken: string
) => {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
};
