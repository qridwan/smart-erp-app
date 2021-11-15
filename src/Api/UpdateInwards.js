import { ref, update } from "@firebase/database";
import { db } from "../firebase";

const UpdateInwards = (product, key) => {
  const updates = {};
  updates["/inventory/in-orders/" + key] = product;
  return update(ref(db), updates);
};

export default UpdateInwards;
