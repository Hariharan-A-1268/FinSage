import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEntry as addEntryApi } from "../../services/apiEntries";
import toast from "react-hot-toast";

export function useAddEntry() {
  const queryClient = useQueryClient();
  const { mutate: addEntry, isPending: isAdding } = useMutation({
    mutationFn: (entry) => addEntryApi(entry),
    onSuccess: () => {
      toast.success("New entry added successfully");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addEntry, isAdding };
}
