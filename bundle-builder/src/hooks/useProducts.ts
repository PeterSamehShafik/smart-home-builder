import { useQuery } from "@tanstack/react-query";
import { camerasApi } from "@/api/endpoints/cameras.api";
import { planApi } from "@/api/endpoints/plan.api";
import { sensorsApi } from "@/api/endpoints/sensors.api";
import { accessoriesApi } from "@/api/endpoints/accessories.api";
import { queryKeys } from "@/api/queryKeys";

export function useCameras() {
  return useQuery({
    queryKey: queryKeys.cameras,
    queryFn: camerasApi.findAll,
  });
}

export function usePlan() {
  return useQuery({
    queryKey: queryKeys.plan,
    queryFn: planApi.findAll,
  });
}

export function useSensors() {
  return useQuery({
    queryKey: queryKeys.sensors,
    queryFn: sensorsApi.findAll,
  });
}

export function useAccessories() {
  return useQuery({
    queryKey: queryKeys.accessories,
    queryFn: accessoriesApi.findAll,
  });
}

export function useAllProducts() {
  const c = useCameras();
  const p = usePlan();
  const s = useSensors();
  const a = useAccessories();

  const data = [
    ...(c.data ?? []),
    ...(p.data ?? []),
    ...(s.data ?? []),
    ...(a.data ?? []),
  ];

  return {
    data,
    isLoading: c.isLoading || p.isLoading || s.isLoading || a.isLoading,
  };
}
