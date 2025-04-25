import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEntry as deleteEntryApi } from "../../services/apiEntries";
import toast from "react-hot-toast";
export function useDeleteEntry() {
  const queryClient = useQueryClient();
  const { mutate: deleteEntry, isPending: isDeleting } = useMutation({
    mutationFn: (uuid) => deleteEntryApi(uuid),
    onSuccess: () => {
      toast.success("Entry Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteEntry, isDeleting };
}
