import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// --- Pickups ---
export function usePickups() {
  return useQuery({
    queryKey: [api.pickups.list.path],
    queryFn: async () => {
      const res = await fetch(api.pickups.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch pickups");
      return res.json(); 
    },
  });
}

export function useCreatePickup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      itemName: string;
      category: string;
      weight: number;
      estimatedValue?: number;
      ownerId: string;
    }) => {
      const res = await fetch(api.pickups.create.path, {
        method: api.pickups.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to schedule pickup");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.pickups.list.path] });
    },
  });
}

// --- AI Scan ---
export function useScanEwaste() {
  return useMutation({
    mutationFn: async (base64Image: string) => {
      const res = await fetch(api.scan.process.path, {
        method: api.scan.process.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to analyze image");
      return res.json() as Promise<{
        item: string;
        type: string;
        weight_kg: number;
        estimated_value_inr: number;
      }>;
    },
  });
}

// --- Impact Dashboard ---
export function useUserImpact(userId: string | undefined) {
  return useQuery({
    queryKey: [buildUrl(api.impact.get.path, { userId: userId || "" })],
    queryFn: async () => {
      if (!userId) return null;
      const url = buildUrl(api.impact.get.path, { userId });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch impact stats");
      return res.json();
    },
    enabled: !!userId,
  });
}
