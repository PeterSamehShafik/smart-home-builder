import { api } from "../axios";
import type { StandardProduct } from "@/types/api.types";

export const accessoriesApi = {
  findAll: async (): Promise<StandardProduct[]> => {
    const response = await api.get<StandardProduct[]>('/accessories');
    return response.data;
  },
};
