import { child, push, ref, set } from "@firebase/database";
import { db } from "../firebase";

const AddClients = (data) => {
  const newPostKey = push(child(ref(db), "inventory/clients/")).key;
  set(ref(db, "inventory/clients/" + newPostKey.slice(1, 10)), {
    ...data,
    key: newPostKey.slice(1, 10),
  })
    .then(() => {
      return true;
    })
    .catch((error) => console.log("🚀~error", error));
};

export default AddClients;
