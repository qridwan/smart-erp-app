import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const GetClients = () => {
  const [clients, setClients] = useState([]);
  const clientsRef = ref(db, "inventory/clients");
  useEffect(() => {
    onValue(clientsRef, (snapshot) => {
     const data = snapshot?.val();
      let alldata = [];
      data &&
        Object.keys(data)?.forEach((key) => {
          const item = data[key];
          item !== 0 && alldata.push(item);
        });
      setClients(alldata);
    });
  }, []);
  return { clients };
};

export default GetClients;
