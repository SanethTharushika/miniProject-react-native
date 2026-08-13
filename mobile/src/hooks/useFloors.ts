import {
  useEffect,
  useState,
} from "react";

import { Floor } from "../types/Floor";
import { subscribeToFloors } from "../services/floorService";

export function useFloors() {
  const [floors, setFloors] =
    useState<Floor[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      subscribeToFloors((data) => {
        setFloors(data);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    floors,
    loading,
  };
}