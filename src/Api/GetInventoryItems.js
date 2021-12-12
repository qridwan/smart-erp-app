import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const GetInventoryItems = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const itemsRef = ref(db, "inventory/items");
  useEffect(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      let alldata = [];
      Object.keys(data).forEach((key) => {
        const item = data[key];
        alldata.push(item);
      });
      setInventoryItems(alldata);
    });
  }, []);
  return { inventoryItems };
};

export default GetInventoryItems;
