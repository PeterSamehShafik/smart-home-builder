import { api } from "../axios";
import type { CameraProduct } from "@/types/api.types";

export const camerasApi = {
  findAll: async (): Promise<CameraProduct[]> => {
    const response = await api.get<CameraProduct[]>('/cameras');
    return response.data;
  },
};
