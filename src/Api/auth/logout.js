import { auth } from "../../firebase";

export const handleLogout = () => {
  auth
    .signOut()
    .then(() => {
    })
    .catch((error) => {
      console.log(error);
    });
};
