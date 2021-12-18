import { ref, update } from "@firebase/database";
import { db } from "../firebase";

const UpdateProduct = (product, key) => {
  const updates = {};
  updates["/inventory/products/" + key] = product;
  return update(ref(db), updates);
};

export default UpdateProduct;
