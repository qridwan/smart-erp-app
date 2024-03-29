import { ref, update } from "@firebase/database";
import { db } from "../firebase";

const UpdateOutwards = (product, key) => {
  const updates = {};
  updates["/inventory/out-orders/" + key] = product;
  return update(ref(db), updates);
};

export default UpdateOutwards;
