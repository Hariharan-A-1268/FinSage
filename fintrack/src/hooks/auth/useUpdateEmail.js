import { useMutation } from "@tanstack/react-query";
import { updateEmail as updateEmailApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
function useUpdateEmail() {
  const { mutate: updateEmail, isPending } = useMutation({
    mutationFn: updateEmailApi,
    onSuccess: () => {
      toast.success("Check new email address for change link");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateEmail, isPending };
}

export default useUpdateEmail;
