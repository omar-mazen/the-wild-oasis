import { useSearchParams } from "react-router-dom";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export default function useCabins() {
  const [search] = useSearchParams();
  const filterValue = search.get("discount");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "discount", value: filterValue };
  const sortByRaw = search.get("sortby") || "name-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins", filter, sortBy],
    queryFn: () => getCabins({ filter, sortBy }),
  });
  return { isLoading, error, cabins };
}
