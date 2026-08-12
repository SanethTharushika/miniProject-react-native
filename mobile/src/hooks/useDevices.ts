import {
  useEffect,
  useState,
} from "react";

import { Device } from "../types/Device";

import {
  subscribeToDevices,
} from "../services/deviceService";

export function useDevices() {
  const [devices, setDevices] =
    useState<Device[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      subscribeToDevices((data) => {
        setDevices(data);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    devices,
    loading,
  };
}