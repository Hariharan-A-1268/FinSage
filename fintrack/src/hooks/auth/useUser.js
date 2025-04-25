import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["userKey"],
    queryFn: getCurrentUser,
  });
  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}
