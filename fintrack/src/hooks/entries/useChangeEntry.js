import { useMutation } from "@tanstack/react-query";
import { changeEntry as changeEntryApi } from "../../services/apiEntries";
import toast from "react-hot-toast";

export function useChangeEntry() {
  const { mutate: changeEntry, isPending: isUpdating } = useMutation({
    mutationFn: (entry) => changeEntryApi(entry),
    onSuccess: () => {
      toast.success("Entry updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { changeEntry, isUpdating };
}
