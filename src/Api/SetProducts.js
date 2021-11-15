import { ref, set } from "@firebase/database";
import { db } from "../firebase";

const SetProducts = (products) => {
  products.forEach((product) => {
    set(ref(db, "inventory/products/" + product?.item_name), product)
      .then(() => {
        return true;
      })
      .catch((error) => console.log("🚀~error", error));
  });
};

export default SetProducts;
