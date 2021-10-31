import { child, push, ref, set } from "@firebase/database";
import { db } from "../firebase";

const SetInwards = (product) => {
    console.log("setting-in-wards")
  const newPostKey = push(child(ref(db), "inventory/in-orders/")).key;
  set(ref(db, "inventory/in-orders/" + newPostKey.slice(1, 10)), {
    ...product,
    key: newPostKey.slice(1, 10),
  })
    .then(() => {
      return true;
    })
    .catch((error) => console.log("🚀~error", error));
};

export default SetInwards;
