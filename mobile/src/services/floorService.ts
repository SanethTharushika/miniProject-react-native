import {
  onValue,
  ref,
} from "firebase/database";

import { database } from "../config/firebase";
import { Floor } from "../types/Floor";

export function subscribeToFloors(
  callback: (floors: Floor[]) => void
) {
  const floorsRef =
    ref(database, "floors");

  return onValue(
    floorsRef,
    (snapshot) => {
      const data = snapshot.val();

      console.log(
        "🔥 Floors from Firebase:",
        data
      );

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
    },
    (error) => {
      console.error(
        "❌ Floor Firebase error:",
        error
      );

      callback([]);
    }
  );
}