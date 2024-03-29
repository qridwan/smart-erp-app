import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const GetItems = () => {
  const [items, setItems] = useState([]);
  const itemsRef = ref(db, "inventory/items");
  useEffect(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      let alldata = [];
      Object.keys(data).forEach((key) => {
        const item = data[key];
        alldata.push(item);
      });
      setItems(alldata);
    });
  }, []);
  return { items };
};

export default GetItems;
