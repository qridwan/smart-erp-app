import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const GetOutwards = () => {
  const [outwards, setOutwards] = useState([]);
  const productsRef = ref(db, "inventory/out-orders");
  useEffect(() => {
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      let alldata = [];
      data &&
        Object?.keys(data)?.forEach((key) => {
          const item = data[key];
          item !== 0 && alldata.push(item);
        });
      setOutwards(alldata);
    });
  }, []);
  return { outwards };
};

export default GetOutwards;
