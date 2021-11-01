import { auth } from "../../firebase";

export const handleLogout = () => {
  auth
    .signOut()
    .then(() => {
      console.log("Logout success");
    })
    .catch((error) => {
      console.log(error);
    });
};
