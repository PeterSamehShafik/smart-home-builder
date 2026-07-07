import type { StandardProduct } from "@/types/api.types";
import { api } from "../axios";

export const sensorsApi = {
  findAll: async (): Promise<StandardProduct[]> => {
    const response = await api.get<StandardProduct[]>('/sensors');
    return response.data;
  },
};
