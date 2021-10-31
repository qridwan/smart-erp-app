import { ref, update } from "@firebase/database";
import { db } from "../firebase";
import GetProducts from "./GetProducts";

const UpdateProductQuantity = (item, quantity) => {
  const { products } = GetProducts();
  console.log("🚀 ~ UpdateProductQuantity ~ products", {
    products,
    item,
    quantity,
  });
  // const updates = {};
  // updates["/inventory/products/" + item] = {quantity: quantity}
  // return update(ref(db), updates);
};

export default UpdateProductQuantity;
