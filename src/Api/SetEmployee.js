import { ref, update } from "@firebase/database";
import { db } from "../firebase";

const SetEmployee = (data, id) => {
  const updates = {};
  updates["/inventory/employees/" + id] = data;
  return update(ref(db), updates);
};

export default SetEmployee;
