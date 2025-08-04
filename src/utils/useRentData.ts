// React hook for managing rent data
import { useState, useEffect, useRef } from "react";
import { getPropertyRentData, RentPeriod } from "./csvParser";

interface RentDataState {
  rentPeriods: RentPeriod[];
  propertyRentData: { [propertyId: number]: RentPeriod[] };
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmZlGCJqjpGyM0CLZiXkY2jjSOU_W5yoR6pQVDHIM2qBDSw6lz4KSEG1B3x1sogqTbL-UE0VoXVcn3/pub?gid=382082490&single=true&output=csv";

// Global cache to prevent duplicate requests
let globalCache: {
  data: RentDataState | null;
  promise: Promise<any> | null;
} = {
  data: null,
  promise: null,
};

export function useRentData() {
  const [rentData, setRentData] = useState<RentDataState>({
    rentPeriods: [],
    propertyRentData: {},
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const isMountedRef = useRef(true);

  const fetchRentData = async () => {
    try {
      // If we have cached data and it's less than 5 minutes old, use it
      if (globalCache.data && globalCache.data.lastUpdated) {
        const cacheAge = Date.now() - globalCache.data.lastUpdated.getTime();
        if (cacheAge < 5 * 60 * 1000) {
          // 5 minutes
          console.log(
            `[${new Date().toLocaleTimeString()}] Using cached data (age: ${Math.round(
              cacheAge / 1000
            )}s)`
          );
          if (isMountedRef.current) {
            setRentData(globalCache.data);
          }
          return;
        }
      }

      // If there's already a request in progress, wait for it
      if (globalCache.promise) {
        console.log(
          `[${new Date().toLocaleTimeString()}] Request already in progress, waiting...`
        );
        await globalCache.promise;
        if (globalCache.data && isMountedRef.current) {
          setRentData(globalCache.data);
        }
        return;
      }

      if (isMountedRef.current) {
        setRentData((prev) => ({ ...prev, loading: true, error: null }));
      }

      // Start new request
      globalCache.promise = getPropertyRentData(CSV_URL);

      const data = await globalCache.promise;

      const newRentData: RentDataState = {
        rentPeriods: data.rentPeriods,
        propertyRentData: data.propertyRentData,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

      // Cache the result
      globalCache.data = newRentData;
      globalCache.promise = null;

      if (isMountedRef.current) {
        setRentData(newRentData);
      }
    } catch (error) {
      globalCache.promise = null;

      if (isMountedRef.current) {
        setRentData((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        }));
      }
    }
  };

  useEffect(() => {
    console.log(
      `[${new Date().toLocaleTimeString()}] useRentData hook mounted, starting fetch...`
    );
    isMountedRef.current = true;
    fetchRentData();

    return () => {
      console.log(
        `[${new Date().toLocaleTimeString()}] useRentData hook unmounting...`
      );
      isMountedRef.current = false;
    };
  }, []);

  return {
    ...rentData,
    refetch: fetchRentData,
  };
}
