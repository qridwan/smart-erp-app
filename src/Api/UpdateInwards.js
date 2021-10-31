import { ref, set, update } from "@firebase/database";
import { db } from "../firebase";

const UpdateInwards = (product, key) => {
  console.log("🚀 ~ UpdateInwards ~ product, key", { product, key });
  const updates = {};
  updates["/inventory/in-orders/" + key] = product;
  return update(ref(db), updates);

  // set(ref(db, "inventory/in-orders/" + key, product))
  //   .then(() => {
  //     return true;
  //   })
  //   .catch((error) => console.log("🚀~error~", error));
};

export default UpdateInwards;
