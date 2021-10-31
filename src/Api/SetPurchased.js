import { child, push, ref, set } from "@firebase/database";
import { db } from "../firebase";

const SetPurchased = (Pproduct) => {
  const newPostKey = push(child(ref(db), "inventory/purchased/")).key;
  set(ref(db, "inventory/purchased/" + newPostKey), {
    ...Pproduct,
    key: newPostKey,
  })
    .then(() => {
      return true;
    })
    .catch((error) => console.log("🚀~error", error));
};

export default SetPurchased;
