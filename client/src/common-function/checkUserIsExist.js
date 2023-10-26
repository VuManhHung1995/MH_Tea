import { checkUserIsExist, verifyToken } from "../api/userApi";

export const verifyUser = async (email) => {
  const isUserExistDB = await checkUserIsExist({ email });
  if (isUserExistDB) {
    const isToken = await verifyToken();
    if (isToken) return true;
  }
  return false;
};
