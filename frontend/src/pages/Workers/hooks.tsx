import { useQuery } from "@tanstack/react-query";
import { getWorkers } from "../../api/Worker";

export const useWorkers = (searchTerm: string, page: number) => {
  return useQuery({
    queryKey: ["workers", searchTerm, page],
    queryFn: () => getWorkers(searchTerm, page),
    staleTime: 5 * 60 * 1000,
  });
};
