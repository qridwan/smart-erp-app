import { child, push, ref, set } from "@firebase/database";
import { db } from "../firebase";

const SetInwards = (product) => {
  const newPostKey = push(child(ref(db), "inventory/in-orders/")).key;
  set(ref(db, "inventory/in-orders/" + newPostKey.slice(1, 10)), {
    ...product,
    receivedDate: product.receivedDate.toString(),
    key: newPostKey.slice(1, 10),
  })
    .then(() => {
      return true;
    })
    .catch((error) => console.log("🚀~error", error));
};

export default SetInwards;
