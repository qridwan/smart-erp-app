import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";

const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password).catch((error) =>
    console.log(error)
  );
};

export default createUser;
