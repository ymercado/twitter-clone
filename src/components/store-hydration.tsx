"use client";

import { useEffect } from "react";
import { useStore, initializeStore } from "@/lib/store";

export function StoreHydration() {
  useEffect(() => {
    // Rehydrate the persisted store on client
    useStore.persist.rehydrate();
    // Initialize with mock data if empty
    initializeStore();
  }, []);

  return null;
}
