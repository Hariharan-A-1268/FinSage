import { useQuery } from "@tanstack/react-query";
import { getDashboardEntries } from "../../services/apiEntries";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../auth/useUser";
export function useDashboardEntries() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const dashboardDate = searchParams.get("DashboarDate");
  const dashboardDatemin = searchParams.get("dashboardDatemin");
  const dashboardDatemax = searchParams.get("dashboardDatemax");
  let filter = [];
  if (dashboardDate) filter.push({ field: "date", value: dashboardDate });
  if (dashboardDatemin && dashboardDatemax) {
    filter.push({
      field: "dateRange",
      value: { min: dashboardDatemin, max: dashboardDatemax },
    });
  }

  const {
    data: { data: entryList, count } = { data: [{}], count: 0 },
    isLoading: isGetting,
  } = useQuery({
    queryKey: ["entries", filter],
    queryFn: () => getDashboardEntries({ user, filter }),
  });

  return { entryList, isGetting, count };
}
