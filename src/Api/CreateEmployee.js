import { getAuth } from "@firebase/auth";
import { auth } from "../firebase";

export const CreateUser = (dataObj) => {
    getAuth()
    .createUser({
      uid: "+11234567890",
      email: "dev@test.com",
      emailVerified: false,
      phoneNumber: "+11234567890",
      password: "asd123",
      displayName: "Dev Doe",
      photoURL: "",
      disabled: false,
    })
    .then((userRecord) => {
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
};
