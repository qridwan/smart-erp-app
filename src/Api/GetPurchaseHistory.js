import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const GetPurchaseHistory = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const productsRef = ref(db, "inventory/purchased");
  useEffect(() => {
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      let alldata = [];
      data &&
        Object.keys(data).forEach((key) => {
          const item = data[key];
          alldata.push(item);
        });
      setPurchasedItems(alldata);
    });
  }, []);
  return { purchasedItems };
};

export default GetPurchaseHistory;
