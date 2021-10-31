import { ref, update } from "@firebase/database";
import { db } from "../firebase";

const UpdatePurchased = (product, key) => {
  const updates = {};
  updates["/inventory/purchased/" + key] = product;
  return update(ref(db), updates);
};

export default UpdatePurchased;
