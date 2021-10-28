import { onValue, ref } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const GetPurchaseHistory = () => {
  const [items, setItems] = useState([]);
  const productsRef = ref(db, "inventory/purchased");
  useEffect(() => {
    onValue(productsRef, (snapshot) => {
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

export default GetPurchaseHistory;
