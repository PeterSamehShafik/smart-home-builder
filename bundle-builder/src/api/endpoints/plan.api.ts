import { api } from "../axios";
import type { StandardProduct } from "@/types/api.types";

export const planApi = {
  findAll: async (): Promise<StandardProduct[]> => {
    const response = await api.get<StandardProduct[]>('/plans');
    return response.data;
  },
};
