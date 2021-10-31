import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const GetInwards = () => {
    const [inwards, setInwards] = useState([]);
    const productsRef = ref(db, "inventory/in-orders");
  useEffect(() => {
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      let alldata = [];
      Object.keys(data).forEach((key) => {
        const item = data[key];
        alldata.push(item);
      });
      setInwards(alldata);
    });
  }, []);
  return { inwards };
};

export default GetInwards;
