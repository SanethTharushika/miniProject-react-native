import {
  onValue,
  ref,
} from "firebase/database";

import { database } from "../config/firebase";
import { Floor } from "../types/Floor";

export function subscribeToFloors(
  callback: (floors: Floor[]) => void
) {
  const floorsRef = ref(database, "floors");

  const unsubscribe = onValue(
    floorsRef,
    (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        callback([]);
        return;
      }

      const floors: Floor[] =
        Object.entries(data).map(
          ([id, value]) => ({
            id,
            ...(value as Omit<Floor, "id">),
          })
        );

      callback(floors);
    }
  );

  return unsubscribe;
}