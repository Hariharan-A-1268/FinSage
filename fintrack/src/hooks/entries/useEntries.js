import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEntries } from "../../services/apiEntries";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../auth/useUser";
const PAGE_SIZE = 8;
export function useEntries() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const sortByRow = searchParams.get("sortBy") || "date-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const date = searchParams.get("date");
  const category = searchParams.get("category");
  const name = searchParams.get("name");
  const essential = searchParams.get("essential");
  const datemin = searchParams.get("datemin");
  const datemax = searchParams.get("datemax");
  const pricemin = searchParams.get("pricemin");
  const pricemax = searchParams.get("pricemax");
  let filter = [];
  if (date) filter.push({ field: "date", value: date });
  if (category) filter.push({ field: "category", value: category });
  if (name) filter.push({ field: "name", value: name });
  if (essential) filter.push({ field: "essential", value: essential });
  if (datemin && datemax) {
    filter.push({ field: "dateRange", value: { min: datemin, max: datemax } });
  }
  if (pricemin && pricemax) {
    filter.push({
      field: "priceRange",
      value: { min: Number(pricemin), max: Number(pricemax) },
    });
  }

  const {
    data: { data: entryList, count } = { data: [{}], count: 0 },
    isLoading: isGetting,
  } = useQuery({
    queryKey: ["entries", user, filter, sortBy, page],
    queryFn: () => getEntries({ user, filter, sortBy, page }),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["entries", user, filter, sortBy, page + 1],
      queryFn: () => getEntries({ user, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["entries", user, filter, sortBy, page - 1],
      queryFn: () => getEntries({ user, sortBy, page: page - 1 }),
    });
  }
  return { entryList, isGetting, count };
}
